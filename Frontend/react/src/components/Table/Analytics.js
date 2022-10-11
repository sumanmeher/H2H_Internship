import React from 'react'
import './Analytics.css'
import { TextField } from '@mui/material'
const Analytics = ({ closemodal }) => {
  const [cleardatefrom, setcleardatefrom] = React.useState('')
  const [cleardateto, setcleardateto] = React.useState('')
  const [duedatefrom, setduedatefrom] = React.useState('')
  const [duedateto, setduedateto] = React.useState('')
  const [baselinefrom, setbaselinefrom] = React.useState('')
  const [baselineto, setbaselineto] = React.useState('')
  const [invoicecurrency, setinvcurrency] = React.useState('')

  return (
    <div className='modal-container-search'>
      <h4>Analytics View</h4>
      <form>
        <div className='flexcontainer'>
          <div className='flexinside'>Clear Date</div>
          <div className='flexinside'>Due Date</div>
        </div>
        <div className='flexcontainer'>
          <TextField
            label='From'
            variant='standard'
            className='textbox-add flexinside'
            type='date'
            value={cleardatefrom}
            onChange={(searchVal) => setcleardatefrom(searchVal.target.value)}
            size='small'
            sx={{ m: 2 }}
          />
          <TextField
            label='From'
            type='date'
            variant='standard'
            className='textbox-add flexinside'
            value={duedatefrom}
            onChange={(searchVal) => setduedatefrom(searchVal.target.value)}
            size='small'
            sx={{ m: 2 }}
          />
        </div>
        <div className='flexcontainer'>
          <TextField
            label='To'
            variant='standard'
            className='textbox-add flexinside'
            type='date'
            value={cleardateto}
            onChange={(searchVal) => setcleardateto(searchVal.target.value)}
            size='small'
            sx={{ m: 2 }}
          />
          <TextField
            label='To'
            type='date'
            variant='standard'
            className='textbox-add flexinside'
            value={duedateto}
            onChange={(searchVal) => setduedateto(searchVal.target.value)}
            size='small'
            sx={{ m: 2 }}
          />
        </div>
        <div className='flexcontainer'>
          <div className='flexinside'>Baseline Create Date</div>
          <div className='flexinside'>Invoice Currency</div>
        </div>
        <div className='flexcontainer'>
          <TextField
            label='From'
            variant='standard'
            className='textbox-add flexinside'
            type='date'
            value={baselinefrom}
            onChange={(searchVal) => setbaselinefrom(searchVal.target.value)}
            size='small'
            sx={{ m: 2 }}
          />
          <TextField
            label='Invoice Currency'
            variant='standard'
            className='textbox-add flexinside'
            value={invoicecurrency}
            onChange={(searchVal) => setinvcurrency(searchVal.target.value)}
            size='small'
            sx={{ m: 2 }}
          />
        </div>
        <div className='flexcontainer'>
          <TextField
            label='To'
            variant='standard'
            className='textbox-add flexinside'
            type='date'
            value={baselineto}
            onChange={(searchVal) => setbaselineto(searchVal.target.value)}
            size='small'
            sx={{ m: 2 }}
          />
          <div className='flexinside padcustom'></div>
        </div>

        <div className='analyticsbuttons'>
          <button
            id='analyticsbutton'
            onClick={() => {
              closemodal()
            }}
          >
            SUBMIT
          </button>
          <button
            id='cancelanalytics'
            onClick={() => {
              closemodal()
            }}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  )
}

export default Analytics
