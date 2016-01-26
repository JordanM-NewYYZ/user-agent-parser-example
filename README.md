# Adidas-NodeJS-Excel-Export
Node.js / AngularJS Stack to generate excel reports.

#Build the app

` $ npm install`

#Start the app

` $ node main.js`

#Environment Variables
` PORT = port number for server to run on (Defaults to 5002)`

#View The AngularJS Demo

###Install Demo Dependancies
` $ cd {project_path}/demo/`

` $ bower install`

Run the file `test.html` (iframe example) or `index.html` and click the download button.
When clicked the browser will automatically download the file to the default download location in your settings.


#Creating A Template

Placeholders are inserted in cells in a spreadsheet. It does not matter how
those cells are formatted, so e.g. it is OK to insert a placeholder (which is
text content) into a cell formatted as a number or currecy or date, if you
expect the placeholder to resolve to a number or currency or date.

### Scalars

Simple placholders take the format `${name}`. Here, `name` is the name of a
key in the placeholders map. The value of this placholder here should be a
scalar, i.e. not an array or object. The placeholder may appear on its own in a
cell, or as part of a text string. For example:

    | Extracted on: | ${extractDate} |

might result in (depending on date formatting in the second cell):

    | Extracted on: | Jun-01-2013 |

Here, `extractDate` may be a date and the second cell may be formatted as a
number.

### Columns

You can use arrays as placeholder values to indicate that the placeholder cell
is to be replicated across columns. In this case, the placeholder cannot appear
inside a text string - it must be the only thing in its cell. For example,
if the placehodler value `dates` is an array of dates:

    | ${dates} |

might result in:

    | Jun-01-2013 | Jun-02-2013 | Jun-03-2013 |

### Tables

Finally, you can build tables made up of multiple rows. In this case, each
placeholder should be prefixed by `table:` and contain both the name of the
placeholder variable (a list of objects) and a key (in each object in the list).
For example:

    | Name                 | Age                 |
    | ${table:people.name} | ${table:people.age} |

If the replacement value under `people` is an array of objects, and each of
those objects have keys `name` and `age`, you may end up with something like:

    | Name        | Age |
    | John Smith  | 20  |
    | Bob Johnson | 22  |

If a particular value is an array, then it will be repeated accross columns as
above.

#Create An Excel Report
###Sample POST Request to the path: `/`

`ex. POST http://localhost:5002/`

`Content-Type: application/json`

JSON Post :
```json
{
"writeToFile":true,
"xlsxTemplate":"UPC_Template_A",
"reportData": {"upc_recs": [{
    "material": "O28640",
    "description": "var sport bra",
    "color": "WHITE,BLUBEA",
    "nrf_color": "100",
    "size": "XS",
    "upc_code": "884564974188"
  }, {
    "material": "O28640",
    "description": "var sport bra",
    "color": "WHITE,BLUBEA",
    "nrf_color": "100",
    "size": "S",
    "upc_code": "884564974195"
  }]}
}
```

###Response From Successful Creation
```json
{
  "downloadUrl": "http://localhost:5002/report/UPC_Template_A1440101369277.xlsx"
}
```

##Excel Creation Error Responses

###Status 404
The template file was not recognized/found by the system
```json
{
  "error": "Unable to read template file."
}
```

###Status 500
There was an error creating the file check the template for errors and the incoming reportData.
```json
{
  "error": "Error generating template. Please check for defined names or errors in the excel file"
}
```

## Caveats

* The spreadsheet must be saved in `.xlsx` format. The following types will not work: `.xls`, `.xlsb` or `.xlsm`.
* Column (array) and table (array-of-objects) insertions cause rows and cells to
  be inserted or removed. When this happens, only a limited number of
  adjustments are made:
    * Merged cells and named cells/ranges to the right of cells where insertions
      or deletions are made are moved right or left, appropriately. This may
      not work well if cells are merged across rows, unless all rows have the
      same number of insertions.
    * Merged cells, named tables or named cells/ranges below rows where further
      rows are inserted are moved down.
  Formulae are not adjusted.
* As a corollary to this, it is not always easy to build formulae that refer
  to cells in a table (e.g. summing all rows) where the exact number of rows
  or columns is not known in advance. There are two strategies for dealing
  with this:
    * Put the table as the last (or only) thing on a particular sheet, and
      use a formula that includes a large number of rows or columns in the
      hope that the actual table will be smaller than this number.
    * Use named tables. When a placeholder in a named table causes columns or
      rows to be added, the table definition (i.e. the cells included in the
      table) will be updated accordingly. You can then use things like
      `TableName[ColumnName]` in your formula to refer to all values in a given
      column in the table as a logical range.
* Placeholders only work in simple cells and tables, pivot tables or
  other such things.
