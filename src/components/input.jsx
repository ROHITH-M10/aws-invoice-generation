import React from 'react'

const Input = () => {
  return (
    <div className='input'>
        <div className="input-container">
          <div className="invoice-top-label">
            Invoice Details
          </div>
          
          
          
          <form action="">

            <div className="input-container-contain">

          <label htmlFor="invoice-number">
            <div>Invoice Number</div>
            <input type="text" id="invoice-number" name="invoice-number" placeholder="Invoice Number" value={""} />
          </label>

          <label htmlFor="bill-date">
            <div>Bill Date</div>
            <input type="date" id="bill-date" name="bill-date" value={""} />
          </label>

          <label htmlFor="due-date">
            <div>Due Date</div>
            <input type="date" id="due-date" name="due-date" value={""} />
          </label>

          <label htmlFor="client-name">
            <div>Client Name</div>
            <input type="text" id="client-name" name="client-name" placeholder="Client Name" value={""} />
          </label>

          <label htmlFor="client-address">
            <div>Client Address</div>
            <input type="text" id="client-address" name="client-address" placeholder="Client Address" value={""} />
          </label>

          <label htmlFor="client-email">
            <div>Client Email</div>
            <input type="email" id="client-email" name="client-email" placeholder="Client Email" value={""} />
          </label>

          <label htmlFor="client-phone">
            <div>Client Phone</div>
            <input type="tel" id="client-phone" name="client-phone" placeholder="Client Phone" value={""} />
          </label>

          <label htmlFor="supplier-name">
            <div>Supplier Name</div>
            <input type="text" id="supplier-name" name="supplier-name" placeholder="Supplier Name" value={""} />
          </label>

          <label htmlFor="supplier-address">
            <div>Supplier Address</div>
            <input type="text" id="supplier-address" name="supplier-address" placeholder="Supplier Address" value={""} />
          </label>

          <label htmlFor="supplier-email">
            <div>Supplier Email</div>
            <input type="email" id="supplier-email" name="supplier-email" placeholder="Supplier Email" value={""} />
          </label>

          <label htmlFor="supplier-phone">
            <div>Supplier Phone</div>
            <input type="tel" id="supplier-phone" name="supplier-phone" placeholder="Supplier Phone" value={""} />
          </label>

          <label htmlFor="tax">
            <div>Tax</div>
            <input type="number" id="tax" name="tax" placeholder="Tax" value={""} />
          </label>

          <label htmlFor="sub-total">
            <div>Sub Total</div>
            <input type="number" id="sub-total" name="sub-total" placeholder="Sub Total" value={""} />
          </label>

          <label htmlFor="grand-total">
            <div>Grand Total</div>
            <input type="number" id="grand-total" name="grand-total" placeholder="Grand Total" value={""} />
          </label>

          <label htmlFor="remark">
            <div>Remark</div>
            <input type="text" id="remark" name="remark" placeholder="Remark" value={""} />
          </label>


          <label htmlFor="submit">
            <input type="button" id="submit" name="submit" value="Submit" />
          </label>


          </div>

          </form>
          
          </div>

        
    </div>
  )
}

export default Input