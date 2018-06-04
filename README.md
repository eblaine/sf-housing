# sf-housing
A interactive explainer of housing in SF over time

## Running
Fortunately, it's really easy to make changes and run this!
Just open index.html in Chrome. If your connection is bad, the faces may take 
a moment to appear. 

## Deploying
If you'd like, you can deploy the project yourself. You'll have to send me a gmail (non-stanford)
first so I can add you. -Ellen
```
firebase deploy --project sf-housing-247
```

## Rendering
There is a rendering API endpoint that expects post requests with data of the form 
specified in `data.js`. That endpoint generates HTML for the smile/frown visualization
we discussed. It should require too much editing at this point, but if you need CSS classes
added, etc. let me know and I'll update it. 

## TODO
Obviously, add content! `index.html` provides an example for generating a box with data
from 1990. We have to add additional static data to `data.js` to render more static
boxes. Also, we'll have to add code to re-render the boxes based on sliders. It should 
be similar to the example that shows how to add content to an initial empty box, i.e.
the one with `id` as 1990.