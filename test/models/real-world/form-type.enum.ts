/*
 * these types are used to generate forms linked to a product:
 * - request
 * - quote
 *
 * frame-order is another container where all the frame-order forms are linked to
 * - frame-order
 *
 * and these to link to an order:
 * - order
 * - confirmation
 * - delivery
 * - invoice
 * - warning
 * - credit
 * - debit
 * - cover
 * - palette info
 */

// NOTE we persist the index of formType, so NEVER change the index and always add one with new types
export enum FormType {
  REQUEST = 0,
  QUOTE = 1,
  ORDER = 2,
  CONFIRMATION = 3,
  DELIVERY = 4,
  INVOICE = 5,
  CREDIT = 6,
  DEBIT = 7,
  FAILURE_RETURN = 8,
  COVER = 9,
  PALETTE_INFO = 10,
  FRAME_ORDER = 11,
  WARNING = 12,
  INVOICE_GMBH = 13,
  STOCK_ORDER = 14,
  STOCK_COVER = 15,
}
