# day_in_history_extension
This day in history chrome extension

## Steps Taken To Develop:

### Step 1:
Acquire data from myDataMaster.com - thanks for the free easy to use data!

### Step 2:
Convert .sql to javascript -> use online tool to make this process as easy as possible. 
Data now stored in easy javascript array with 'date' and 'event' fields.  Refer to todayinhist.js.

### Step 3:
Write javascript functions to fetch correct events based on current date.  Use binary search on array to minimized number of steps - maximum  ~10 (since operation is log(N)).  Use current day as seed for randomly shuffling all events for a given date - this prevents consistency across all users of extension.

### Step 4:
Work on CSS and HTML - make extension easy to use, lightweight, and non-intrusive.  Use brown tones for colors to give extension 'historic' feel.

### Step 5:
Publish on chrome extension store.

All feedback welcome.  

Twitter: [@AlexBudilovsky](https://twitter.com/AlexBudilovsky)  
[www.alexbudilovsky.com](https://www.alexbudilovsky.com)  
alexbudy [at] gmail.com  

