import React, { useContext } from 'react'
import { getDelete } from '../../Services/data'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { TableContext } from '../Context/TableContext'
import './Delete.css'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})
const Delete = ({ closemodal }) => {
  const { selectedRows } = useContext(TableContext)
  const { setOpensucessdelete } = useContext(TableContext)
  const { setOpenerrordelete } = useContext(TableContext)
  const { refresh } = useContext(TableContext)

  async function deletedata() {
    for (let i = 0; i < selectedRows.length; i++) {
      let response = await getDelete(selectedRows[i])
      if (response) {
        setOpensucessdelete(true)
      } else {
        setOpenerrordelete(true)
      }
    }
    refresh()
    closemodal()
  }
  return (
    <div className='deletecontainer'>
      <div className='margin'>Delete Records ?</div>
      <div className='margin'>
        Are you sure you want to delete these record[s]
      </div>
      <div className='deletebuttons'>
        <button
          id='canceldelete'
          onClick={() => {
            closemodal()
          }}
        >
          CANCEL
        </button>
        <button
          id='deletebutton'
          onClick={() => {
            deletedata()
          }}
        >
          DELETE
        </button>
      </div>
    </div>
  )
}

export default Delete
