import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton,
  IonCheckbox,
  IonInput,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonTextarea
} from '@ionic/angular/standalone';
import { GiftProduct } from '../../contracts/gift-product.interface';
import { GiftProductData } from '../../models/gift-product-data';
import { GiftCertificate } from '../../models/gift-certificate';
import { GiftSet } from '../../models/gift-set';
import { Postcard } from '../../models/postcard';
import { Souvenir } from '../../models/souvenir';
import { GiftPriceValidatorService } from '../../validators/gift-price-validator.service';
import { GiftTitleValidatorService } from '../../validators/gift-title-validator.service';

type GiftProductType = 'giftSet' | 'postcard' | 'souvenir' | 'giftCertificate';
type FormMode = 'add' | 'edit';

@Component({
  selector: 'app-gift-product-form',
  standalone: true,
  imports: [
    IonButton,
    IonCheckbox,
    IonInput,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    ReactiveFormsModule
  ],
  templateUrl: './gift-product-form.component.html',
  styleUrls: ['./gift-product-form.component.scss']
})
export class GiftProductFormComponent implements OnInit, OnChanges {
  private readonly fb = inject(FormBuilder);
  private readonly titleValidator = inject(GiftTitleValidatorService);
  private readonly priceValidator = inject(GiftPriceValidatorService);

  @Input() mode: FormMode = 'add';
  @Input() products: GiftProduct[] = [];
  @Input() initialProduct: GiftProduct | null = null;

  @Output() productSaved = new EventEmitter<GiftProductData>();
  @Output() formCancelled = new EventEmitter<void>();

  readonly productTypes: Array<{ value: GiftProductType; label: string }> = [
    { value: 'giftSet', label: 'Подарунковий набір' },
    { value: 'postcard', label: 'Листівка' },
    { value: 'souvenir', label: 'Сувенір' },
    { value: 'giftCertificate', label: 'Подарунковий сертифікат' }
  ];

  readonly deliveryTypes = ['email', 'sms', 'print'];

  currentType: GiftProductType = 'giftSet';

  readonly form = this.fb.nonNullable.group({
    id: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-]+$/)]],
    type: ['giftSet' as GiftProductType, Validators.required],
    title: ['', [Validators.required, Validators.minLength(3)]],
    basePrice: [100, [Validators.required, Validators.min(1)]],
    theme: [''],
    itemNames: this.fb.array<FormControl<string>>([]),
    occasion: [''],
    message: [''],
    material: [''],
    isFragile: [false],
    recipientName: [''],
    deliveryType: ['email']
  });

  ngOnInit(): void {
    this.form.get('title')?.addValidators(
      this.titleValidator.uniqueTitleValidator(
        () => this.products,
        () => this.initialProduct?.id ?? null
      )
    );
    this.form.get('basePrice')?.addValidators(
      this.priceValidator.minimumPriceForTypeValidator(() => this.currentType)
    );

    this.form.get('type')?.valueChanges.subscribe((type) => {
      this.currentType = (type ?? 'giftSet') as GiftProductType;
      this.applyTypeValidators();
      this.form.get('basePrice')?.updateValueAndValidity({ emitEvent: false });
    });

    this.resetForm(this.initialProduct);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialProduct'] && !changes['initialProduct'].firstChange) {
      this.resetForm(this.initialProduct);
    }

    if (changes['products'] && !changes['products'].firstChange) {
      this.form.get('title')?.updateValueAndValidity();
    }
  }

  get itemNames(): FormArray<FormControl<string>> {
    return this.form.get('itemNames') as FormArray<FormControl<string>>;
  }

  get isEditMode(): boolean {
    return this.mode === 'edit';
  }

  addSetItem(value = ''): void {
    this.itemNames.push(this.createSetItemControl(value));
  }

  removeSetItem(index: number): void {
    if (this.itemNames.length > 1) {
      this.itemNames.removeAt(index);
    }
  }

  submit(): void {
    this.applyTypeValidators();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.productSaved.emit(this.buildProductData());

    if (this.mode === 'add') {
      this.resetForm(null);
    }
  }

  cancel(): void {
    this.formCancelled.emit();
  }

  hasError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  hasSetItemError(index: number): boolean {
    const control = this.itemNames.at(index);
    return control.invalid && (control.dirty || control.touched);
  }

  private resetForm(product: GiftProduct | null): void {
    this.itemNames.clear();

    if (!product) {
      this.currentType = 'giftSet';
      this.form.reset({
        id: this.createProductId(),
        type: 'giftSet',
        title: '',
        basePrice: 100,
        theme: '',
        occasion: '',
        message: '',
        material: '',
        isFragile: false,
        recipientName: '',
        deliveryType: 'email'
      });
      this.addSetItem();
      this.applyTypeValidators();
      return;
    }

    this.currentType = product.type as GiftProductType;
    this.form.reset({
      id: product.id,
      type: this.currentType,
      title: product.title,
      basePrice: product.basePrice,
      theme: '',
      occasion: '',
      message: '',
      material: '',
      isFragile: false,
      recipientName: '',
      deliveryType: 'email'
    });

    if (product instanceof GiftSet) {
      this.form.patchValue({ theme: product.theme });
      const itemNames = product.itemNames.length
        ? product.itemNames
        : Array.from({ length: product.itemCount }, (_, index) => `Елемент ${index + 1}`);
      itemNames.forEach((itemName) => this.addSetItem(itemName));
    }

    if (product instanceof Postcard) {
      this.form.patchValue({
        occasion: product.occasion,
        message: product.message
      });
    }

    if (product instanceof Souvenir) {
      this.form.patchValue({
        material: product.material,
        isFragile: product.isFragile
      });
    }

    if (product instanceof GiftCertificate) {
      this.form.patchValue({
        recipientName: product.recipientName,
        deliveryType: product.deliveryType
      });
    }

    if (!this.itemNames.length) {
      this.addSetItem();
    }

    this.applyTypeValidators();
  }

  private applyTypeValidators(): void {
    this.clearTypeValidators();

    if (this.currentType === 'giftSet') {
      if (!this.itemNames.length) {
        this.addSetItem();
      }

      this.form.get('theme')?.setValidators([Validators.required, Validators.minLength(3)]);
      this.itemNames.setValidators([Validators.required, Validators.minLength(1)]);
    }

    if (this.currentType !== 'giftSet') {
      this.itemNames.clear();
    }

    if (this.currentType === 'postcard') {
      this.form.get('occasion')?.setValidators([Validators.required, Validators.minLength(3)]);
      this.form.get('message')?.setValidators([Validators.required, Validators.minLength(5)]);
    }

    if (this.currentType === 'souvenir') {
      this.form.get('material')?.setValidators([
        Validators.required,
        Validators.pattern(/^[A-Za-zА-Яа-яІіЇїЄєҐґ'’ -]+$/)
      ]);
    }

    if (this.currentType === 'giftCertificate') {
      this.form.get('recipientName')?.setValidators([
        Validators.required,
        Validators.pattern(/^[A-Za-zА-Яа-яІіЇїЄєҐґ'’ -]+$/)
      ]);
      this.form.get('deliveryType')?.setValidators([
        Validators.required,
        Validators.pattern(/^(email|sms|print)$/)
      ]);
    }

    this.updateTypeControlsValidity();
  }

  private clearTypeValidators(): void {
    for (const controlName of ['theme', 'occasion', 'message', 'material', 'recipientName', 'deliveryType']) {
      this.form.get(controlName)?.clearValidators();
    }

    this.itemNames.clearValidators();
  }

  private updateTypeControlsValidity(): void {
    for (const controlName of ['theme', 'occasion', 'message', 'material', 'recipientName', 'deliveryType']) {
      this.form.get(controlName)?.updateValueAndValidity({ emitEvent: false });
    }

    this.itemNames.updateValueAndValidity({ emitEvent: false });
  }

  private createSetItemControl(value = ''): FormControl<string> {
    return new FormControl(value, {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)]
    });
  }

  private buildProductData(): GiftProductData {
    const value = this.form.getRawValue();
    const commonData = {
      id: value.id,
      type: value.type,
      title: value.title.trim(),
      basePrice: Number(value.basePrice)
    };

    if (value.type === 'giftSet') {
      const itemNames = this.itemNames.controls.map((control) => control.value.trim());

      return {
        ...commonData,
        itemCount: itemNames.length,
        itemNames,
        theme: value.theme.trim()
      };
    }

    if (value.type === 'postcard') {
      return {
        ...commonData,
        occasion: value.occasion.trim(),
        message: value.message.trim()
      };
    }

    if (value.type === 'souvenir') {
      return {
        ...commonData,
        material: value.material.trim(),
        isFragile: value.isFragile ?? false
      };
    }

    return {
      ...commonData,
      recipientName: value.recipientName.trim(),
      deliveryType: value.deliveryType
    };
  }

  private createProductId(): string {
    return `gift-${Date.now()}`;
  }
}
