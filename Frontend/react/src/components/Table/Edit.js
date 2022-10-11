import React, { useContext } from 'react'
import { TextField } from '@mui/material'
import { getUpdate } from '../../Services/data'
import { TableContext } from '../Context/TableContext'
import './Edit.css'

const Edit = ({ closemodal }) => {
  const [cust_payment_terms, setcustpaymentterms] = React.useState('')
  const [invoice_currency, setinvoicecurrency] = React.useState('')

  const { selectedRows } = useContext(TableContext)
  const { setOpensucessedit } = useContext(TableContext)
  const { setOpenerroredit } = useContext(TableContext)
  const { refresh } = useContext(TableContext)

  async function update() {
    for (let i = 0; i < selectedRows.length; i++) {
      let response = await getUpdate(
        invoice_currency,
        cust_payment_terms,
        selectedRows[i]
      )
      if (response) {
        setOpensucessedit(true)
      } else {
        setOpenerroredit(true)
      }
    }
    refresh()
    closemodal()
  }

  return (
    <div className='modal-container-edit'>
      <h4>Edit</h4>
      <form>
        <div>
          <TextField
            label='Invoice Currency'
            variant='standard'
            className='textbox-add'
            value={invoice_currency}
            onChange={(searchVal) => setinvoicecurrency(searchVal.target.value)}
            size='small'
            sx={{ m: 2 }}
          />
          <TextField
            label='Customer Payment Terms'
            variant='standard'
            className='textbox-add'
            value={cust_payment_terms}
            onChange={(searchVal) =>
              setcustpaymentterms(searchVal.target.value)
            }
            size='small'
            sx={{ m: 2 }}
          />
        </div>
      </form>
      <div className='editbuttons'>
        <button
          id='editbutton'
          onClick={() => {
            update()
            closemodal()
          }}
        >
          SAVE
        </button>
        <button
          id='canceledit'
          onClick={() => {
            closemodal()
          }}
        >
          CANCEL
        </button>
      </div>
    </div>
  )
}

export default Edit
