import React, { useState, useEffect } from 'react'
import Add from './Add'
import Edit from './Edit'
import Delete from './Delete'
import Popup from 'reactjs-popup'
import { getData, getPrediction, updateAging } from '../../Services/data'
import './Table.css'
import { DataGrid } from '@mui/x-data-grid'
import AdvSearch from './AdvSearch'
import { TableContext } from '../Context/TableContext'
import Analytics from './Analytics'
import RefreshIcon from '@mui/icons-material/Refresh'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const columns = [
  { field: 'sl_no', headerName: 'SL no', width: 90 },
  { field: 'business_code', headerName: 'Business Code', width: 90 },
  { field: 'cust_number', headerName: 'Customer Number', width: 110 },
  { field: 'clear_date', headerName: 'Clear Date', width: 110 },
  { field: 'buisness_year', headerName: 'Buisness Year', width: 110 },
  { field: 'doc_id', headerName: 'Document Id', width: 110 },
  { field: 'posting_date', headerName: 'Posting Date', width: 110 },
  {
    field: 'document_create_date',
    headerName: 'Document Create Date',
    width: 110,
  },
  { field: 'due_in_date', headerName: 'Due in Date', width: 110 },
  { field: 'invoice_currency', headerName: 'Invoice Currency', width: 90 },
  { field: 'document_type', headerName: 'Document Type', width: 90 },
  { field: 'posting_id', headerName: 'Posting Id', width: 90 },
  { field: 'total_open_amount', headerName: 'Total Open Amount', width: 90 },
  {
    field: 'baseline_create_date',
    headerName: 'Baseline Create Date',
    width: 110,
  },
  {
    field: 'cust_payment_terms',
    headerName: 'Customer Payment Terms',
    width: 90,
  },
  { field: 'invoice_id', headerName: 'Invoice Id', width: 110 },
  {
    field: 'aging_bucket',
    headerName: 'Aging Bucket',
    width: 110,
    valueGetter: (params) => params.row.aging_bucket || 'N/A',
  },
]

const Table = () => {
  const [Rowdata, setRowData] = useState({})
  const [data, setData] = useState([])
  const [originaldata, setoriginalData] = useState([])

  const [pageSize, setPageSize] = React.useState(10)

  const [selectedRows, setSelectedRows] = React.useState([])
  const [disableedit, setdisableedit] = React.useState(true)
  const [searchText, setSearchText] = React.useState('')

  const [opensucessedit, setOpensucessedit] = React.useState(false)
  const [openerroredit, setOpenerroredit] = React.useState(false)
  const [opensucessdelete, setOpensucessdelete] = React.useState(false)
  const [openerrordelete, setOpenerrordelete] = React.useState(false)
  const [opensucesspredict, setOpensucesspredict] = React.useState(false)
  const [openerrorpredict, setOpenerrorpredict] = React.useState(false)

  const {
    sl_no,
    business_code,
    cust_number,
    clear_date,
    buisness_year,
    posting_date,
    document_create_date,
    due_in_date,
    invoice_currency,
    document_type,
    posting_id,
    total_open_amount,
    baseline_create_date,
    cust_payment_terms,
    invoice_id,
  } = Rowdata

  useEffect(() => {
    if (selectedRows.length === 0) {
      setdisableedit(true)
      console.log(selectedRows)
      console.log(disableedit)
    } else {
      setdisableedit(false)
      console.log(selectedRows)
      console.log(disableedit)
    }
  }, [selectedRows])

  useEffect(async () => {
    setData(await getData())
    setoriginalData(await getData())
  }, [])

  function loadoriginal() {
    setData(originaldata)
  }

  async function refresh() {
    setData(await getData())
    setSearchText('')
  }

  const handleClosesucessedit = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpensucessedit(false)
  }
  const handleCloseerroredit = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenerroredit(false)
  }

  const handleClosesucessdelete = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpensucessdelete(false)
  }
  const handleCloseerrordelete = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenerrordelete(false)
  }

  const handleClosesucesspredict = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpensucesspredict(false)
  }
  const handleCloseerrorpredict = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenerrorpredict(false)
  }

  const requestSearch = (searchValue) => {
    if (searchValue === '') {
      setSearchText(searchValue)
      loadoriginal()
    } else {
      setSearchText(searchValue)
      const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
      const filteredRows = data.filter((row) => {
        return Object.keys(row).some((field) => {
          return searchRegex.test(row[field])
        })
      })
      setData(filteredRows)
    }
  }

  async function predict() {
    for (let i = 0; i < selectedRows.length; i++) {
      let [agingresponse] = await getPrediction(selectedRows[i])
      console.log(agingresponse)
      let response = await updateAging(
        agingresponse.aging_bucket,
        agingresponse.doc_id
      )

      if (response) {
        setOpensucesspredict(true)
      } else {
        setOpenerrorpredict(true)
      }
    }
    refresh()
  }

  return (
    <div className='table-data'>
      <TableContext.Provider
        value={{
          setData,
          selectedRows,
          setRowData,
          Rowdata,
          setOpenerroredit,
          setOpensucessedit,
          setOpenerrordelete,
          setOpensucessdelete,
          refresh,
        }}
      >
        <div className='table'>
          <div className='table-function'>
            <div className='button-group'>
              <button
                className='predict'
                id='predict-btn'
                disabled={disableedit}
                onClick={() => {
                  predict()
                }}
              >
                <p>
                  <span>&nbsp;&nbsp;</span>PREDICT
                </p>
              </button>
              <Popup
                id='AdvSearch-popup'
                trigger={
                  <button className='analytics-view' id='analytics-btn'>
                    <p>
                      <span>&nbsp;&nbsp;</span>ANALYTICS VIEW
                    </p>
                  </button>
                }
                modal
              >
                {(closeadv) => <Analytics closemodal={closeadv} />}
              </Popup>

              <Popup
                id='AdvSearch-popup'
                trigger={
                  <button className='advance-search ' id='advance-btn'>
                    <p>
                      <span>&nbsp;</span>ADVANCE SEARCH
                    </p>
                  </button>
                }
                modal
              >
                {(closeadv) => <AdvSearch closemodal={closeadv} />}
              </Popup>
            </div>
            <div>
              <button
                className='refreshbutton'
                onClick={() => {
                  refresh()
                }}
              >
                <RefreshIcon color='primary' />
              </button>
            </div>
            <div className='search-bar' id=''>
              <input
                type='text'
                name='search'
                id='searchbox'
                value={searchText}
                onChange={(searchVal) => requestSearch(searchVal.target.value)}
                placeholder='Search by Customer Id'
              />
            </div>
            <div className='button-group2'>
              <Popup
                id='add-popup'
                trigger={
                  <button className='add-invoice' id='add-btn'>
                    <p>
                      <span>&nbsp;&nbsp;</span>ADD
                    </p>
                  </button>
                }
                modal
              >
                {(closeadd) => <Add closemodal={closeadd} />}
              </Popup>
              <Popup
                id='edit-popup'
                trigger={
                  <button
                    className='edit-invoice'
                    id='edit-btn'
                    disabled={disableedit}
                  >
                    <p>
                      <span>&nbsp;&nbsp;</span>EDIT
                    </p>
                  </button>
                }
                modal
              >
                {(closeedit) => <Edit closemodal={closeedit} />}
              </Popup>
              <Popup
                id='delete-popup'
                trigger={
                  <button
                    className='delete-invoice'
                    id='delete-btn'
                    disabled={disableedit}
                  >
                    <p>
                      <span>&nbsp;</span>DELETE
                    </p>
                  </button>
                }
                modal
              >
                {(closedelete) => <Delete closemodal={closedelete} />}
              </Popup>
            </div>
          </div>
          <div className='table-data'>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid
                  rows={data}
                  sx={{
                    width: '100vw',
                    border: 'none',
                    '& .MuiDataGrid-columnHeaderTitle': {
                      textOverflow: 'clip',
                      whiteSpace: 'break-spaces',
                      lineHeight: 1,
                    },
                  }}
                  getRowId={(r) => r.sl_no}
                  columns={columns}
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  onSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids)
                    const selectedRows = data.filter((row) =>
                      selectedIDs.has(row.sl_no)
                    )
                    setSelectedRows(selectedRows)
                  }}
                  pagination
                  checkboxSelection
                  disableSelectionOnClick
                />
              </div>
            </div>
          </div>
        </div>
        <Snackbar
          open={opensucessedit}
          autoHideDuration={6000}
          onClose={handleClosesucessedit}
        >
          <Alert
            onClose={handleClosesucessedit}
            severity='success'
            sx={{ width: '100%' }}
          >
            Data Updated successfully!!!!
          </Alert>
        </Snackbar>
        <Snackbar
          open={openerroredit}
          autoHideDuration={6000}
          onClose={handleCloseerroredit}
        >
          <Alert
            onClose={handleCloseerroredit}
            severity='error'
            sx={{ width: '100%' }}
          >
            Failed to Update Data!!!!
          </Alert>
        </Snackbar>
        <Snackbar
          open={opensucessdelete}
          autoHideDuration={6000}
          onClose={handleClosesucessdelete}
        >
          <Alert
            onClose={handleClosesucessdelete}
            severity='success'
            sx={{ width: '100%' }}
          >
            Data Deleted successfully!!!!
          </Alert>
        </Snackbar>
        <Snackbar
          open={openerrordelete}
          autoHideDuration={6000}
          onClose={handleCloseerrordelete}
        >
          <Alert
            onClose={handleCloseerrordelete}
            severity='error'
            sx={{ width: '100%' }}
          >
            Failed to Delete Data!!!!
          </Alert>
        </Snackbar>
        <Snackbar
          open={opensucesspredict}
          autoHideDuration={6000}
          onClose={handleClosesucesspredict}
        >
          <Alert
            onClose={handleClosesucesspredict}
            severity='success'
            sx={{ width: '100%' }}
          >
            Data Predicted successfully!!!!
          </Alert>
        </Snackbar>
        <Snackbar
          open={openerrorpredict}
          autoHideDuration={6000}
          onClose={handleCloseerrorpredict}
        >
          <Alert
            onClose={handleCloseerrorpredict}
            severity='error'
            sx={{ width: '100%' }}
          >
            Failed to Predict Data!!!!
          </Alert>
        </Snackbar>
      </TableContext.Provider>
    </div>
  )
}

export default Table
