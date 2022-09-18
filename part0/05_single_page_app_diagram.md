# Single Page app Sequence Diagram

``` mermaid
  sequenceDiagram
    participant B as Browser
    participant S as Server
   
    B ->> S: GET https://studies.cs.helsinki.fi/exampleapp/spa
    S -->> B: HTML-code
    B ->> S: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    S -->> B: main.css
    B ->> S: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    S -->> B: spa.js
    note left of B: spa.js executes, fetching notes from server
    B ->> S: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    S -->> B: data.json
    note left of B: Script function `redrawNotes` is called to render page
```
