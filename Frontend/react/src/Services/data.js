import axios from 'axios'
export const getData = async () => {
  let response = await axios.get('http://localhost:8080/Backend/Fetch')
  return response.data
}

export const getSearch = async (
  doc_id,
  cust_number,
  invoice_id,
  buisness_year
) => {
  let stm =
    'doc_id=' +
    doc_id +
    '&cust_number=' +
    cust_number +
    '&invoice_id=' +
    invoice_id +
    '&buisness_year=' +
    buisness_year
  let response = await axios.get(
    'http://localhost:8080/Backend/AdvSearchData?' + stm
  )

  return response.data
}

export const add = async (
  business_code,
  cust_number,
  clear_date,
  business_year,
  doc_id,
  posting_date,
  document_create_date,
  due_in_date,
  invoice_currency,
  document_type,
  posting_id,
  total_open_amount,
  baseline_create_date,
  cust_payment_terms,
  invoice_id
) => {
  console.log(business_code)
  let stm =
    'business_code=' +
    business_code +
    '&cust_number=' +
    cust_number +
    '&clear_date=' +
    clear_date +
    '&business_year=' +
    business_year +
    '&doc_id=' +
    doc_id +
    '&posting_date=' +
    posting_date +
    '&document_create_date=' +
    document_create_date +
    '&due_in_date=' +
    due_in_date +
    '&invoice_currency=' +
    invoice_currency +
    '&document_type=' +
    document_type +
    '&posting_id=' +
    posting_id +
    '&total_open_amount=' +
    total_open_amount +
    '&baseline_create_date=' +
    baseline_create_date +
    '&cust_payment_terms=' +
    cust_payment_terms +
    '&invid=' +
    invoice_id
  console.log(invoice_id)
  let response = await axios.get('http://localhost:8080/Backend/Add?' + stm)
  console.log(response.data)
  return response.data
}

export const getUpdate = async (
  invoice_currency,
  cust_payment_terms,
  { sl_no }
) => {
  let stm =
    'invoice_currency=' +
    invoice_currency +
    '&cust_payment_terms=' +
    cust_payment_terms +
    '&sl_no=' +
    sl_no
  console.log(stm)
  let response = await axios.get('http://localhost:8080/Backend/Update?' + stm)
  return response.data
}

export const getDelete = async ({ sl_no,business_code,cust_number }) => {
  let stm = 'sl_no=' + sl_no + '&business_code=' + business_code +'&cust_number=' + cust_number
  let response = await axios.get('http://localhost:8080/Backend/Delete?' + stm)
  return response.data
}
export const getPrediction = async (data) => {
  const json = JSON.stringify(data)
  const res = await axios.post('http://127.0.0.1:5000/', json, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log(res.data)
  return res.data
}

export const updateAging = async (aging_bucket, doc_id) => {
  console.log(aging_bucket, doc_id)
  let stm = 'aging_bucket=' + aging_bucket + '&doc_id=' + doc_id
  const response = await axios.get(
    'http://localhost:8080/Backend/UpdateAging?' + stm
  )
  console.log(response.data)
  return response.data
}
