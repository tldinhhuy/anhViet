var fileService = require('./service');
var cheerio = require('cheerio')

const COL_THRESHOLD = 3;

(async () => {
    let file = await fileService.readFile('./generate/generate.html')
    file = file.toString()
    let $ = cheerio.load(file)
   // console.log($('table').children('tbody'))
    var tbodies = $('table').children('tbody')
    tbodies.each(index => filterTable(tbodies[index]))
    $('.toRemove').remove()
    await fileService.createFile('./output.html', $.html())
   // console.log($.html())

function filterTable(table) {
   // console.log(table)
  $(table).find('tr').each((idx, row) => {
    if(idx !== 0) {
      filterRow(row)
    } else {
   removeColumns(row, COL_THRESHOLD)
    }
  })

  function filterRow(row) {
  removeColumns(row, COL_THRESHOLD)

    $(row).find('td').each((idx, el) => {
        //console.log(el)
      if(idx !== 0 && el.attribs.style && el.attribs.style.indexOf('red') === -1) {
        $(el).addClass('toRemove')
      }
    })
  }
}

function removeColumns(row, threshold) {  
    $(row).find('td').each((idx, row) => {
    if(idx > threshold) {
        $(row).addClass('toRemove')
    }
  }) 
}
})()