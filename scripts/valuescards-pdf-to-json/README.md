# Converting Valuescards.pdf to a JSON

First thing I needed to do was convert each relevant cell represneting a `Value` of the PDF to a JSON so I could
easily work with the data.

## PDF to Excel

Immediate thought was to convert it into an Excel file, and figured I could use my own company's tools for this:

https://xodo.com/pdf-to-excel-converter

The immediate result actually wasn't too bad, as seen in [Valuescards.from-xodo.xlsx](./intermediate-files-for-posterity/Valuescards.from-xodo.xlsx)

## Excel Data to CSV

I decided to move all relevant text into a single sheet, and save that as a CSV to remove extraneous styling & text,
and so I could easily work with the text in a script, as seen in
[Valuescards.csv](./intermediate-files-for-posterity/Valuescards.from-xodo.xlsx)

The conversion from PDF to XLSX wasn't completely clean, since each cell in the PDF had extraneous text, lets call them
`Descriptors` giving more explanation to a particular `Value`. Some `Descriptors` spanned multiple lines, some didn't
make it in the conversion. But, I could at least script building most of it into a dictionary, then fix up the few that
didn't quite convert cleanly by hand
