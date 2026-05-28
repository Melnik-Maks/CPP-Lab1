import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, shareReplay } from 'rxjs';
import { GiftProduct } from '../contracts/gift-product.interface';

export type GiftCategoryType = 'giftSet' | 'postcard' | 'souvenir' | 'giftCertificate';

export interface GiftPriceFilter {
  minPrice: number | null;
  maxPrice: number | null;
}

@Injectable()
export class GiftCategoryFilterService {
  private readonly productsSubject = new BehaviorSubject<GiftProduct[]>([]);
  private readonly selectedCategoriesSubject = new BehaviorSubject<GiftCategoryType[]>([]);
  private readonly searchTermSubject = new BehaviorSubject<string>('');
  private readonly priceFilterSubject = new BehaviorSubject<GiftPriceFilter>({
    minPrice: null,
    maxPrice: null
  });

  readonly selectedCategories$ = this.selectedCategoriesSubject
    .asObservable()
    .pipe(distinctUntilChanged((previous, current) => previous.join('|') === current.join('|')));

  readonly filteredProducts$ = combineLatest([
    this.productsSubject.asObservable(),
    this.selectedCategories$,
    this.searchTermSubject.asObservable().pipe(distinctUntilChanged()),
    this.priceFilterSubject.asObservable().pipe(
      distinctUntilChanged((previous, current) => {
        return previous.minPrice === current.minPrice && previous.maxPrice === current.maxPrice;
      })
    )
  ]).pipe(
    map(([products, categories, searchTerm, priceFilter]) => {
      const normalizedSearch = searchTerm.trim().toLowerCase();
      const uniqueCategories = new Set(categories);

      return products.filter((product) => {
        const matchesCategory = uniqueCategories.size === 0 || uniqueCategories.has(product.type as GiftCategoryType);
        const matchesSearch = !normalizedSearch ||
          product.title.trim().toLowerCase().includes(normalizedSearch);
        const matchesMinPrice = priceFilter.minPrice === null || product.basePrice >= priceFilter.minPrice;
        const matchesMaxPrice = priceFilter.maxPrice === null || product.basePrice <= priceFilter.maxPrice;

        return matchesCategory && matchesSearch && matchesMinPrice && matchesMaxPrice;
      });
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  setProducts(products: GiftProduct[]): void {
    this.productsSubject.next(products);
  }

  setSelectedCategories(categories: GiftCategoryType[]): void {
    this.selectedCategoriesSubject.next([...new Set(categories)]);
  }

  setSearchTerm(searchTerm: string): void {
    this.searchTermSubject.next(searchTerm);
  }

  setPriceFilter(priceFilter: GiftPriceFilter): void {
    this.priceFilterSubject.next({
      minPrice: this.normalizePrice(priceFilter.minPrice),
      maxPrice: this.normalizePrice(priceFilter.maxPrice)
    });
  }

  clearFilters(): void {
    this.selectedCategoriesSubject.next([]);
    this.searchTermSubject.next('');
    this.priceFilterSubject.next({
      minPrice: null,
      maxPrice: null
    });
  }

  getSelectedCategories(): GiftCategoryType[] {
    return this.selectedCategoriesSubject.getValue();
  }

  private normalizePrice(value: number | null): number | null {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
      return null;
    }

    return Number(value);
  }
}
