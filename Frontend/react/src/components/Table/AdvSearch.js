import React, { useContext } from 'react'
import './AdvSearch.css'
import { TextField } from '@mui/material'
import { getSearch } from '../../Services/data'
import { TableContext } from '../Context/TableContext'

const AdvSearch = ({ closemodal }) => {
  const [doc_id, setdocid] = React.useState('')
  const [cust_number, setcustnumber] = React.useState('')
  const [invoice_id, setinvoiceid] = React.useState('')
  const [buisness_year, setbuisnessyear] = React.useState('')
  const { setData } = useContext(TableContext)

  async function funsearch() {
    setData(await getSearch(doc_id, cust_number, invoice_id, buisness_year))
  }

  return (
    <div className='modal-container-search'>
      <h4>Advance Search</h4>
      <form>
        <div>
          <TextField
            label='Document ID'
            variant='standard'
            className='textbox-add'
            value={doc_id}
            onChange={(searchVal) => setdocid(searchVal.target.value)}
            size='small'
            sx={{ m: 2 }}
          />
          <TextField
            label='Invoice ID'
            variant='standard'
            className='textbox-add'
            value={invoice_id}
            onChange={(searchVal) => setinvoiceid(searchVal.target.value)}
            size='small'
            sx={{ m: 2 }}
          />
        </div>
        <div>
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
            label='Business Year'
            variant='standard'
            className='textbox-add'
            value={buisness_year}
            onChange={(searchVal) => setbuisnessyear(searchVal.target.value)}
            size='small'
            sx={{ m: 2 }}
          />
        </div>
      </form>
      <div className='advsearchbuttons'>
        <button
          id='advsearchbutton'
          onClick={() => {
            funsearch()
            closemodal()
          }}
        >
          SEARCH
        </button>
        <button
          id='canceladvsearch'
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

export default AdvSearch
