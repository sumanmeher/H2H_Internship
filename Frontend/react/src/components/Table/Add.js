import React from 'react'
import './Add.css'
import { add } from '../../Services/data'
import { TextField } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const Add = ({ closemodal }) => {
  const [business_code, setbusinesscode] = React.useState('')
  const [cust_number, setcustnumber] = React.useState('')
  const [clear_date, setcleardate] = React.useState('')
  const [buisness_year, setbuisnessyear] = React.useState('')
  const [doc_id, setdocid] = React.useState('')
  const [posting_date, setpostingdate] = React.useState('')
  const [doc_create_date, setdoccreatedate] = React.useState('')
  const [due_in_date, setdueindate] = React.useState('')
  const [invoice_currency, setinvoicecurrency] = React.useState('')
  const [document_type, setdocumenttype] = React.useState('')
  const [posting_id, setpostingid] = React.useState('')
  const [total_open_amount, settotalopenamount] = React.useState('')
  const [baseline_create_date, setbaselinecreatedate] = React.useState('')
  const [cust_payment_terms, setcustpaymentterms] = React.useState('')
  const [invoice_id, setinvoiceid] = React.useState('')
  const [opensucess, setOpensucess] = React.useState(false)
  const [openerror, setOpenerror] = React.useState(false)

  const handleClosesucess = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpensucess(false)
  }
  const handleCloseerror = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenerror(false)
  }
  async function addData() {
    let response = await add(
      business_code,
      cust_number,
      clear_date,
      buisness_year,
      doc_id,
      posting_date,
      doc_create_date,
      due_in_date,
      invoice_currency,
      document_type,
      posting_id,
      total_open_amount,
      baseline_create_date,
      cust_payment_terms,
      invoice_id
    )

    if (response) {
      setOpensucess(true)
    } else {
      setOpenerror(true)
    }
  }

  return (
    <div className='modal-container-add'>
      <h4>Add</h4>
      <div>
        <TextField
          label='Business Code'
          variant='standard'
          className='textbox-add'
          value={business_code}
          onChange={(searchVal) => setbusinesscode(searchVal.target.value)}
          size='small'
          sx={{ m: 2 }}
        />
        <TextField
          label='Customer Number'
          variant='standard'
          className='textbox-add'
          value={cust_number}
          onChange={(searchVal) => setcustnumber(searchVal.target.value)}
          size='small'
          sx={{ m: 2 }}
        />
        <TextField
          label='Clear Date'
          type='date'
          variant='standard'
          className='textbox-add'
          value={clear_date}
          onChange={(searchVal) => setcleardate(searchVal.target.value)}
          size='small'
          sx={{ m: 2 }}
        />
        <TextField
          label='Business Year'
          variant='standard'
          className='textbox-add'
          value={buisness_year}
          onChange={(searchVal) => setbuisnessyear(searchVal.target.value)}
          size='small'
          sx={{ m: 2 }}
        />
      </div>
      <div>
        <TextField
          label='Document Id'
          variant='standard'
          className='textbox-add'
          value={doc_id}
          onChange={(searchVal) => setdocid(searchVal.target.value)}
          size='small'
          sx={{ m: 2 }}
        />
        <TextField
          label='Posting Date'
          type='date'
          variant='standard'
          className='textbox-add'
          value={posting_date}
          onChange={(searchVal) => setpostingdate(searchVal.target.value)}
          size='small'
          sx={{ m: 2 }}
        />
        <TextField
          label='Document Create Date'
          type='date'
          variant='standard'
          className='textbox-add'
          value={doc_create_date}
          onChange={(searchVal) => setdoccreatedate(searchVal.target.value)}
          size='small'
          sx={{ m: 2 }}
        />
        <TextField
          label='Due Date'
          type='date'
          variant='standard'
          className='textbox-add'
          value={due_in_date}
          onChange={(searchVal) => setdueindate(searchVal.target.value)}
          size='small'
          sx={{ m: 2 }}
        />
      </div>
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
          label='Document Type'
          variant='standard'
          className='textbox-add'
          value={document_type}
          onChange={(searchVal) => setdocumenttype(searchVal.target.value)}
          size='small'
          sx={{ m: 2 }}
        />
        <TextField
          label='Posting Id'
          variant='standard'
          className='textbox-add'
          value={posting_id}
          onChange={(searchVal) => setpostingid(searchVal.target.value)}
          size='small'
          sx={{ m: 2 }}
        />
        <TextField
          label='Total open Amount'
          variant='standard'
          className='textbox-add'
          value={total_open_amount}
          onChange={(searchVal) => settotalopenamount(searchVal.target.value)}
          size='small'
          sx={{ m: 2 }}
        />
      </div>
      <div>
        <TextField
          label='baseline Create Date'
          type='date'
          variant='standard'
          className='textbox-add'
          value={baseline_create_date}
          onChange={(searchVal) =>
            setbaselinecreatedate(searchVal.target.value)
          }
          size='small'
          sx={{ m: 2 }}
        />
        <TextField
          label='Customer Payment Terms'
          variant='standard'
          className='textbox-add'
          value={cust_payment_terms}
          onChange={(searchVal) => setcustpaymentterms(searchVal.target.value)}
          size='small'
          sx={{ m: 2 }}
        />
        <TextField
          label='Invoice Id'
          variant='standard'
          className='textbox-add'
          value={invoice_id}
          onChange={(searchVal) => setinvoiceid(searchVal.target.value)}
          size='small'
          sx={{ m: 2 }}
        />
      </div>
      <div className='addbuttons'>
        <button
          id='addbutton'
          onClick={() => {
            addData()
          }}
        >
          ADD
        </button>
        <button
          id='canceladd'
          onClick={() => {
            closemodal()
          }}
        >
          CANCEL
        </button>
      </div>
      <Snackbar
        open={opensucess}
        autoHideDuration={6000}
        onClose={handleClosesucess}
      >
        <Alert
          onClose={handleClosesucess}
          severity='success'
          sx={{ width: '100%' }}
        >
          Data Added successfully!!!!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openerror}
        autoHideDuration={6000}
        onClose={handleCloseerror}
      >
        <Alert
          onClose={handleCloseerror}
          severity='error'
          sx={{ width: '100%' }}
        >
          Failed to Add Data
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Add
