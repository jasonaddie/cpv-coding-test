# CPVs Coding Test
This is my work for a coding test to scrape the CPV codes at http://cpv.data.ac.uk/scheme-CPV2008.html and make them viewable/searchable through a simple interface.

# System Requirements
* Ruby version - 2.5.1
* Database - postgresql
* Database creation - run: `rails db:setup`
* Database population - run: `rails scraper:download_and_process_cpv2008`

# Code Notes
* In the model/database, I decided to keep the original code with the suffix and the code without the suffix. In the long run, you never know when this full code might be needed so I added it to the system.
* I used the ancestry gem to manage the parent/child relationship. I have used this gem in the past and it has been very helpful for this kind of situation.
* The scraper and processing code are run through rake tasks. The rake tasks use modules that are in the lib folder. It takes about 40 seconds to scrape and process the data.
* The scraper downloads the data to a CSV file before processing. I did this so that while I was working on the processing code I would not have to contiously rescrape the page. I also use the CSV file for the data download link.
* I added a link in the header to download the data. Whenever I have an open data project I always try to include download links.
* I setup an API controller for the ajax requests and added versioning to it (i.e, /api/v1/search). This is long-term thinking assuming this project will continue and evolve over time.
* I used the Active Model Serializers gem to serialize the API calls. I know there are faster ones out there but I have not had enough time to learn them so I stuck with this gem.
* For the search, the code search starts from the beginning of the code - I did not see people needing to do a code search from the middle of a code. For the description search, it looks for the text anywhere in the field.
* I used jquery for the javascript frontend.
* I have some javascript utility-type functions. Most of those are from previous projects or taken from online.

# Time Notes
I ended up spending about 6 hours on this. I got stuck on the code that processes the scraped data to properly assign the parent to the item. The code I originally written was close but was just not working 100%. I eventually figured out my problem and started over, but by then I had lost a lot of time trying to fix the original code.

I also sadly lost some time setting up the Rails app. In my current job, we create Rails template repos with the most common settings and gems so we can just clone and go. I did not have a 5.2 repo setup yet so I had to create one and it is amazing all of the little things that I forgot had to be setup because it is usually done for me in the template.

# Optimizations
* Search - search result items that have children are links to view the items in that category. For items that do not have children, there are no links. Ideally there should be some way to allow the user to either view the search result as part of the list of chilren items on the right or some way to indicate which parent category the item belongs to so the user has a better context about the search result.
* Search - use a better search service that properly determines the relevance and sorts the records accordingly.
* Add integration tests - I was falling behind in time so I decided to skip updating the model tests and skipped all together the controller request tests. I have only used testing on a couple projects and so it is my week point. This is something that I want to improve in the near future.
* Obviously a design is needed. ;)
* Better organize the html class names and css
* Figure out how to integrate the orphaned codes listed below.

# Items that do not have direct parents
The following 45 codes are for items that do not have a direct parent and are cosnidered orphaned.
I was not sure how to assign them to a parent so, due to time constraint, I did not.
* 30192121-5
* 30192122-2
* 30192123-9
* 30192124-6
* 30192125-3
* 30192126-0
* 30192127-7
* 34511100-3
* 35611100-1
* 35611200-2
* 35611300-3
* 35611400-4
* 35611500-5
* 35611600-6
* 35611700-7
* 35611800-8
* 35612100-8
* 35612200-9
* 35612300-0
* 35612400-1
* 35612500-2
* 35811100-3
* 35811200-4
* 35811300-5
* 38527100-6
* 38527200-7
* 38527300-8
* 38527400-9
* 39254000-7
* 39254100-8
* 39254110-1
* 39254120-4
* 39254130-7
* 42924200-1
* 42924300-2
* 42924310-5
* 42924700-6
* 42924710-9
* 42924720-2
* 42924730-5
* 42924740-8
* 42924790-3
* 44115310-5
* 44613110-4
* 60112000-6
