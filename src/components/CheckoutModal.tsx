import React, { useState } from 'react';
import { X, CheckCircle2, Truck, ShieldCheck, CreditCard, ChevronRight, ArrowLeft, PackageCheck, Copy, Check } from 'lucide-react';
import { CartItem, CheckoutFormData, OrderConfirmation } from '../types';
import { SHIPPING_METHODS, lookupPostcodeEstimate } from '../data/shipping';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedDiscountCode: string;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedDiscountCode,
  onClearCart
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: 'chloe.student@flinders.edu.au',
    firstName: 'Chloe',
    lastName: 'Mitchell',
    phone: '0412 345 678',
    addressLine1: 'Sturt Rd, Flinders University',
    addressLine2: 'Flinders Living Student Hall B',
    suburb: 'Bedford Park',
    state: 'SA',
    postcode: '5042',
    shippingMethodId: 'auspost-standard',
    paymentMethod: 'afterpay',
    cardNumber: '4532 •••• •••• 8821',
    cardExpiry: '08/28',
    cardCvc: '412',
    discountCode: appliedDiscountCode,
    saveInfo: true
  });

  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmation | null>(null);
  const [copiedTracking, setCopiedTracking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Financial calculations
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountPercent = appliedDiscountCode.toUpperCase() === 'STUDENT15' ? 0.15 : 0;
  const discountAmount = subtotal * discountPercent;
  
  // Shipping calculation
  const selectedShipping = SHIPPING_METHODS.find((m) => m.id === formData.shippingMethodId) || SHIPPING_METHODS[0];
  const isFreeStandard = subtotal >= (selectedShipping.freeThreshold || 50.00);
  const shippingCost = (formData.shippingMethodId === 'auspost-standard' || formData.shippingMethodId === 'auspost-locker') && isFreeStandard
    ? 0
    : selectedShipping.cost;

  const total = subtotal - discountAmount + shippingCost;
  const afterpayQuarter = (total / 4).toFixed(2);
  const gstPortion = (total / 11).toFixed(2); // 10% Australian GST included in AUD total

  // Handle Postcode typing to auto-detect AusPost state
  const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pc = e.target.value;
    setFormData((prev) => {
      const lookup = lookupPostcodeEstimate(pc);
      return {
        ...prev,
        postcode: pc,
        state: lookup.state
      };
    });
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const randomOrder = `PL-${Math.floor(100000 + Math.random() * 900000)}`;
      const randomTracking = `AP-${Math.floor(100000000 + Math.random() * 900000000)}AU`;
      
      const conf: OrderConfirmation = {
        orderNumber: randomOrder,
        trackingNumber: randomTracking,
        date: new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }),
        items: [...items],
        subtotal,
        discount: discountAmount,
        shippingCost,
        total,
        shippingAddress: { ...formData },
        estimatedDeliveryDate: 'Thursday, 3–5 Business Days'
      };

      setOrderConfirmation(conf);
      setIsProcessing(false);
      setStep('confirmation');
      onClearCart();
    }, 1200);
  };

  const copyTrackingNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#fbfaf7] rounded-xl shadow-2xl border border-[#ded8cb] overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* Top Header */}
        <div className="bg-white border-b border-[#e9e3d6] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif-title text-xl font-semibold text-[#1e251e]">Paper Land</span>
            <span className="text-[#999] font-light">/</span>
            <span className="text-xs text-[#5f685f] font-medium">
              {step === 'details' && 'Step 1 of 2: Australian Delivery & Shipping'}
              {step === 'payment' && 'Step 2 of 2: Payment Gateway (Afterpay / Card)'}
              {step === 'confirmation' && 'Order Confirmed · Australia Post Tracking'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#f1ede3] text-[#60695f] transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Content */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          {step === 'details' && (
            <div className="space-y-6">
              {/* Customer Contact */}
              <div>
                <h3 className="font-serif-title text-base font-semibold text-[#202820] mb-3">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[#4c544c] mb-1 font-medium">Email for Order Updates & AusPost Tracking</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#cfc6b5] rounded focus:ring-1 focus:ring-[#283228] text-xs text-[#202720]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#4c544c] mb-1 font-medium">Australian Mobile (SMS delivery notifications)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="04xx xxx xxx"
                      className="w-full p-2.5 bg-white border border-[#cfc6b5] rounded focus:ring-1 focus:ring-[#283228] text-xs text-[#202720]"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="font-serif-title text-base font-semibold text-[#202820] mb-3">
                  2. Australian Delivery Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[#4c544c] mb-1 font-medium">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#cfc6b5] rounded text-xs text-[#202720]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#4c544c] mb-1 font-medium">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#cfc6b5] rounded text-xs text-[#202720]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#4c544c] mb-1 font-medium">Street Address</label>
                    <input
                      type="text"
                      value={formData.addressLine1}
                      onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                      placeholder="Unit, street number and street name"
                      className="w-full p-2.5 bg-white border border-[#cfc6b5] rounded text-xs text-[#202720]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#4c544c] mb-1 font-medium">Apartment, Suite, Uni Hall (Optional)</label>
                    <input
                      type="text"
                      value={formData.addressLine2}
                      onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                      placeholder="e.g. Student Hall, Unit 4B"
                      className="w-full p-2.5 bg-white border border-[#cfc6b5] rounded text-xs text-[#202720]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4c544c] mb-1 font-medium">Suburb / City</label>
                    <input
                      type="text"
                      value={formData.suburb}
                      onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                      className="w-full p-2.5 bg-white border border-[#cfc6b5] rounded text-xs text-[#202720]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[#4c544c] mb-1 font-medium">State</label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value as any })}
                        className="w-full p-2.5 bg-white border border-[#cfc6b5] rounded text-xs text-[#202720]"
                      >
                        <option value="NSW">NSW</option>
                        <option value="VIC">VIC</option>
                        <option value="QLD">QLD</option>
                        <option value="WA">WA</option>
                        <option value="SA">SA</option>
                        <option value="TAS">TAS</option>
                        <option value="ACT">ACT</option>
                        <option value="NT">NT</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#4c544c] mb-1 font-medium">Postcode</label>
                      <input
                        type="text"
                        value={formData.postcode}
                        onChange={handlePostcodeChange}
                        maxLength={4}
                        placeholder="5042"
                        className="w-full p-2.5 bg-white border border-[#cfc6b5] rounded text-xs text-[#202720] font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Method Selection */}
              <div>
                <h3 className="font-serif-title text-base font-semibold text-[#202820] mb-3">
                  3. Select Australia Post Delivery Method
                </h3>
                <div className="space-y-2">
                  {SHIPPING_METHODS.map((method) => {
                    const isFree = (method.id === 'auspost-standard' || method.id === 'auspost-locker') && isFreeStandard;
                    return (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition-all ${
                          formData.shippingMethodId === method.id
                            ? 'bg-[#f4efe4] border-[#293229] ring-1 ring-[#293229]'
                            : 'bg-white border-[#ded8cb] hover:bg-[#faf7f0]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingMethod"
                            checked={formData.shippingMethodId === method.id}
                            onChange={() => setFormData({ ...formData, shippingMethodId: method.id })}
                            className="text-[#283228] focus:ring-[#283228]"
                          />
                          <div>
                            <div className="font-medium text-xs text-[#222822]">
                              {method.name}
                            </div>
                            <div className="text-[11px] text-[#6a7269]">
                              {method.estimatedDays} · {method.description}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-mono font-semibold text-xs text-[#202720]">
                            {isFree ? 'FREE' : `$${method.cost.toFixed(2)} AUD`}
                          </span>
                          {isFree && (
                            <div className="text-[10px] text-emerald-800 font-medium">
                              Order &gt; $50
                            </div>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 flex items-center justify-between border-t border-[#e8e2d4]">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-[#626a61] hover:text-black transition-colors"
                >
                  Return to bag
                </button>

                <button
                  type="button"
                  onClick={() => setStep('payment')}
                  className="py-3 px-6 bg-[#283228] hover:bg-[#1a211a] text-white text-xs font-semibold rounded shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Continue to Payment (${total.toFixed(2)} AUD)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <button
                onClick={() => setStep('details')}
                className="flex items-center gap-1.5 text-xs text-[#636c62] hover:text-[#202720] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Shipping Details</span>
              </button>

              <div>
                <h3 className="font-serif-title text-base font-semibold text-[#202820] mb-2">
                  Select Payment Gateway
                </h3>
                <p className="text-xs text-[#646d63] mb-4">
                  Seamless Australian payment processing with SSL encryption and instant confirmation.
                </p>

                {/* Gateway choices */}
                <div className="space-y-3">
                  {/* Option 1: Afterpay */}
                  <label
                    className={`block p-4 rounded-lg border cursor-pointer transition-all ${
                      formData.paymentMethod === 'afterpay'
                        ? 'bg-[#eff7f1] border-emerald-800 ring-1 ring-emerald-800'
                        : 'bg-white border-[#ded8cb] hover:bg-[#faf7f0]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'afterpay'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'afterpay' })}
                          className="text-emerald-800 focus:ring-emerald-800"
                        />
                        <div>
                          <div className="font-semibold text-xs text-[#1e271f] flex items-center gap-2">
                            <span>Afterpay</span>
                            <span className="bg-[#b2fce4] text-[#004f38] text-[10px] font-bold px-1.5 py-0.2 rounded">
                              Pay in 4
                            </span>
                          </div>
                          <div className="text-[11px] text-[#5e665d] mt-0.5">
                            4 interest-free installments of <strong className="font-mono text-[#1a211a]">${afterpayQuarter} AUD</strong> fortnightly
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-emerald-900 hidden sm:inline">
                        Instant Approval
                      </span>
                    </div>
                  </label>

                  {/* Option 2: Klarna */}
                  <label
                    className={`block p-4 rounded-lg border cursor-pointer transition-all ${
                      formData.paymentMethod === 'klarna'
                        ? 'bg-[#fcf0f5] border-[#c95382] ring-1 ring-[#c95382]'
                        : 'bg-white border-[#ded8cb] hover:bg-[#faf7f0]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'klarna'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'klarna' })}
                        />
                        <div>
                          <div className="font-semibold text-xs text-[#202720] flex items-center gap-2">
                            <span>Klarna</span>
                            <span className="bg-[#ffb3c7] text-[#441122] text-[10px] font-bold px-1.5 py-0.2 rounded">
                              Flexible
                            </span>
                          </div>
                          <div className="text-[11px] text-[#5e665d] mt-0.5">
                            Pay in 4 or Pay in 30 days without interest.
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* Option 3: Credit Card */}
                  <label
                    className={`block p-4 rounded-lg border cursor-pointer transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'bg-[#f4efe4] border-[#293229] ring-1 ring-[#293229]'
                        : 'bg-white border-[#ded8cb] hover:bg-[#faf7f0]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'card'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                        />
                        <div className="font-semibold text-xs text-[#202720] flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-[#445544]" />
                          <span>Credit / Debit Card</span>
                          <span className="text-[10px] text-[#7d867c]">(Visa, Mastercard, Amex)</span>
                        </div>
                      </div>
                    </div>

                    {formData.paymentMethod === 'card' && (
                      <div className="mt-3 pt-3 border-t border-[#ded8cb] space-y-2 text-xs">
                        <div>
                          <label className="block text-[#4c544c] mb-1 font-medium">Card Number</label>
                          <input
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                            placeholder="4532 0000 0000 0000"
                            className="w-full p-2 bg-white border border-[#cfc6b5] rounded text-xs font-mono"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[#4c544c] mb-1 font-medium">Expiry</label>
                            <input
                              type="text"
                              value={formData.cardExpiry}
                              onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                              placeholder="MM/YY"
                              className="w-full p-2 bg-white border border-[#cfc6b5] rounded text-xs font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[#4c544c] mb-1 font-medium">CVV / CVC</label>
                            <input
                              type="password"
                              value={formData.cardCvc}
                              onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                              maxLength={4}
                              placeholder="123"
                              className="w-full p-2 bg-white border border-[#cfc6b5] rounded text-xs font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </label>

                  {/* Option 4: Apple Pay / Google Pay */}
                  <label
                    className={`block p-4 rounded-lg border cursor-pointer transition-all ${
                      formData.paymentMethod === 'apple-pay'
                        ? 'bg-[#f4efe4] border-[#293229] ring-1 ring-[#293229]'
                        : 'bg-white border-[#ded8cb] hover:bg-[#faf7f0]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === 'apple-pay'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'apple-pay' })}
                      />
                      <div className="font-semibold text-xs text-[#202720]">
                        Apple Pay / Google Pay (1-Touch Instant Checkout)
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Summary breakdown */}
              <div className="p-4 bg-white rounded-lg border border-[#e4ded2] space-y-2 text-xs">
                <div className="flex justify-between text-[#616a60]">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="font-mono tabular-nums">${subtotal.toFixed(2)} AUD</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>15% Student Discount</span>
                    <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)} AUD</span>
                  </div>
                )}
                <div className="flex justify-between text-[#616a60]">
                  <span>Shipping ({selectedShipping.name})</span>
                  <span className="font-mono tabular-nums">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)} AUD`}</span>
                </div>
                <div className="flex justify-between text-[#616a60]">
                  <span>Australian GST (10% included)</span>
                  <span className="font-mono tabular-nums">${gstPortion} AUD</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1f261f] pt-2 border-t border-[#f0ebde]">
                  <span>Total Due Today</span>
                  <span className="font-mono tabular-nums">${total.toFixed(2)} AUD</span>
                </div>
              </div>

              {/* Complete Order button */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full py-4 px-6 bg-[#283228] hover:bg-[#1a211a] disabled:opacity-50 text-white font-semibold text-sm rounded shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                {isProcessing ? (
                  <span>Authorizing Payment & AusPost Dispatch...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Pay ${total.toFixed(2)} AUD & Generate AusPost Tracking</span>
                  </>
                )}
              </button>
            </div>
          )}

          {step === 'confirmation' && orderConfirmation && (
            <div className="space-y-6 animate-fade-in text-center sm:text-left">
              <div className="p-6 bg-[#f2f8f2] border border-[#d2ecd2] rounded-xl flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                  <PackageCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif-title text-xl font-bold text-emerald-950">
                    Thank you! Your Paper Land order is confirmed.
                  </h3>
                  <p className="text-xs text-emerald-800">
                    We've sent your receipt and tracking link to <strong>{orderConfirmation.shippingAddress.email}</strong>.
                  </p>
                </div>
              </div>

              {/* Australia Post Live Tracking Simulation Card */}
              <div className="p-5 bg-white rounded-xl border border-[#ded8cb] shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ece6d9] pb-3 text-xs">
                  <div>
                    <span className="text-[#7a8379]">Order Number: </span>
                    <strong className="font-mono text-[#1f261f]">{orderConfirmation.orderNumber}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#7a8379]">AusPost Tracking: </span>
                    <span className="font-mono font-bold text-[#283228] bg-[#f0ecdf] px-2 py-0.5 rounded">
                      {orderConfirmation.trackingNumber}
                    </span>
                    <button
                      onClick={() => copyTrackingNumber(orderConfirmation.trackingNumber)}
                      className="p-1 hover:bg-[#eee8db] rounded text-[#5e665d] transition-colors cursor-pointer"
                      title="Copy Tracking Number"
                    >
                      {copiedTracking ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#2b332b]">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-[#3e523e]" />
                      <span>Australia Post Express Manifest</span>
                    </span>
                    <span className="text-emerald-800 font-mono text-[11px]">Ready for Courier Pickup</span>
                  </div>

                  <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
                    <div className="p-2 bg-emerald-100 text-emerald-900 rounded font-semibold">
                      1. Order Placed
                    </div>
                    <div className="p-2 bg-emerald-100 text-emerald-900 rounded font-semibold">
                      2. Milled & Bound
                    </div>
                    <div className="p-2 bg-[#f4f1e8] text-[#717b70] rounded">
                      3. In Transit (AusPost)
                    </div>
                    <div className="p-2 bg-[#f4f1e8] text-[#717b70] rounded">
                      4. Delivered
                    </div>
                  </div>
                </div>

                {/* Delivery details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#525a51]">
                  <div className="p-3 bg-[#faf8f4] rounded border border-[#eae3d5]">
                    <div className="font-semibold text-[#222922] mb-1">Delivering To:</div>
                    <div>{orderConfirmation.shippingAddress.firstName} {orderConfirmation.shippingAddress.lastName}</div>
                    <div>{orderConfirmation.shippingAddress.addressLine1}</div>
                    {orderConfirmation.shippingAddress.addressLine2 && <div>{orderConfirmation.shippingAddress.addressLine2}</div>}
                    <div>{orderConfirmation.shippingAddress.suburb}, {orderConfirmation.shippingAddress.state} {orderConfirmation.shippingAddress.postcode}</div>
                    <div>Australia (Mobile: {orderConfirmation.shippingAddress.phone})</div>
                  </div>

                  <div className="p-3 bg-[#faf8f4] rounded border border-[#eae3d5]">
                    <div className="font-semibold text-[#222922] mb-1">Payment & Dispatch:</div>
                    <div>Gateway: <strong className="capitalize">{orderConfirmation.shippingAddress.paymentMethod}</strong></div>
                    <div>Total Paid: <strong className="font-mono">${orderConfirmation.total.toFixed(2)} AUD</strong></div>
                    <div className="text-[11px] text-[#737d72] mt-1">
                      Australia Post parcel tracking will update automatically as it moves through Melbourne and Adelaide transit facilities.
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="text-center pt-2">
                <button
                  onClick={onClose}
                  className="py-3 px-8 bg-[#283228] hover:bg-[#1a211a] text-white font-medium text-xs rounded transition-colors cursor-pointer"
                >
                  Continue Browsing Paper Land
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
