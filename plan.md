1. Create a simple Next.js app with two user roles:

   * Writer
   * Reader

2. The home page should contain two buttons:

   * Login as Writer
   * Login as Reader

3. When the writer button is clicked, redirect to a writer page.
   Example route:

   * `/articles/create`

4. When the reader button is clicked, redirect to a reader page.
   Example route:

   * `/articles/view`

5. Use the Next.js App Router structure.

6. Create a folder structure like this:

```txt
app
├── page for home screen
├── articles
│   ├── create page
│   ├── view page
│   ├── dynamic single article page using id
│   └── dynamic edit article page using id
├── components
│   ├── navbar
│   ├── article card
│   ├── article list
│   └── article form
└── data
    └── article mock data
```

7. Keep article data in a separate file initially.
   Each article should contain:

   * id
   * title
   * content

8. The writer page should contain:

   * Navbar
   * Article creation form
   * Existing article list
   * Edit option for each article
   * Button to go to reader page

9. The reader page should contain:

   * Navbar
   * List of all saved articles
   * Each article shown as a card
   * Button or link to open the full article page

10. Each article card should show:

* Title
* Short content preview
* Read Full Article link
* Edit Article link if the page is opened by a writer

11. The single article page should:

* Open using dynamic route with article id
* Show full title
* Show full content
* Show back button to article list
* Show “Article Not Found” if the id does not exist

12. The edit article page should:

* Open using article id
* Pre-fill title and content
* Allow updating article information
* Redirect back after save
* Show “Article Not Found” if the article does not exist

13. Make all UI reusable through components:

* Navbar component
* Article card component
* Article list component
* Article form component

14. Keep article form separate from article display logic.

15. Use mock data at first.
    Later replace mock data with:

* Database
* API routes
* Backend server
* Authentication

16. Use a clean layout:

* White cards
* Rounded corners
* Shadows
* Spacing between sections
* Responsive grid for article cards

17. Use Tailwind CSS for styling.

18. Use dynamic routes for:

* Single article page
* Edit article page

19. In newer Next.js versions, dynamic params may be async, so the single article page should properly handle async params.

20. Prepare the app so backend integration is easy later.
    Eventually article data can come from:

* REST API
* Database
* CMS
* External backend service

21. Future backend flow should be:

* Writer creates article
* Article saved in database
* Reader fetches saved articles
* Writer edits article
* Updated article saved again
* Reader sees updated version

22. The overall flow of the app should be:

```txt
Home Page
   ├── Writer Login
   │      └── Create Page
   │              ├── Add Article
   │              ├── View Existing Articles
   │              └── Edit Existing Article
   │
   └── Reader Login
          └── View Page
                  ├── List Articles
                  └── Open Single Article
```
