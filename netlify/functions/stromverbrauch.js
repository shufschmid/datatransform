const fetch = require('node-fetch')

const API_ENDPOINT = 'https://data.bs.ch/api/v2/catalog/datasets/100233/records?select=avg%28stromverbrauch_kwh%29%20as%20avg_stromverbrauch&group_by=year%2Cdayofyear&limit=1000&offset=0&timezone=UTC'

exports.handler = async (event, context) => {
  let response
  try {
    response = await fetch(API_ENDPOINT).then((res) => res.json())
    data = response.records.map(function(element){
        return element.record.fields.avg_stromverbrauch})
    
    
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify([[
    data]])

  }
}