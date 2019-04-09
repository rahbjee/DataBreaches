# Welcome to our interactive visualization of recent data breaches.  
##### This project was developed as part of SI 649: Information Visualization

Our data comes from informationisbeautiful.net which maintains this spreadsheet: http://bit.ly/bigdatabreaches

Currently our visualization is built using Vega-Lite and we were able to accomplish many of our original domain tasks with our planned encodings.  However, ultimately we were unable to solve our overlapping marks issue so visibility problems remain.  To avoid this for our final implementation, we intend to utilize  Beeswarm plot (similar to this solution shown here: https://bl.ocks.org/mbostock/6526445e2b44303eebf21da3b6627320) customized so that each point's radius is calculated as a function of the number of records lost while its corresponding placement transformation is also calculated by the same function.

We also constructed a timeline of various policies pertaining to data security & plan display the various stages of passing of these laws as annotations on our final graph.  Additionally, we would like to incorporate a drop-down menu that will allow the audience to filter the data breaches by industry.  A mock-up of this is shown in our previous Tableau version (PNG image included in zip file).  

You must run a http.server in order to see the interactive graphs produced by Vega-Lite.  In order to do this navigate to your directory in the console & run the following python3 command:
```
python -m http.server
```
