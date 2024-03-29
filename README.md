# Serenity App

   This app utilizes Flask SQLAlchemy for its backend and React.js / Redux.js for its frontend.
<br />
<br />

## Project Description

   * Serenity is an app for users looking for some positivity in their lives! The positive quotes rendered on the Splash page are from [zenquotes.io](https://zenquotes.io/). When a user logs in, there’ll be tranquil music playing to set the mood. When a user successfully signs up and logs in, they’ll be able to journal, draw, and leave nice comments for other users to increase positivity within their lives.
<br />
<br />

## MVP
   * Hosted on Heroku, found [here](https://serenity-journal.herokuapp.com).
   * Audio begins on a loop once the user is logged in
   * User dashboards are displayed as a calendar with a list of tasks to complete every day
   * Logged in users can write journals, draw images with a virtual canvas, and leave nice comments for other users
<br />
<br />

## Database Schema and Diagram:

### `Users`
| Column Name    | Data Type | Details                |
|----------------|:---------:|------------------------|
| id             | integer   | not null, primary key  |
| firstName      | string    | not null               |
| lastName       | string    | not null               |
| username       | string    | not null, indexed      |
| email          | string    | not null, indexed      |
| avatar         | string    | no constraints         |
| hashedPassword | string    | not null               |
| createdAt      | datetime  | not null               |
| updatedAt      | datetime  | not null               |

* unique index on `username`
* unique index on `email`
* `avatar` will be URL to picture using [AWS](https://aws.amazon.com/s3/)
* `Users` have many `journal entries` and `drawings`
<br />
<br />

### `Journal_Entries`
| Column Name | Data Type | Details                         |
|-------------|:---------:|---------------------------------|
| id          |  integer  | not null, primary key           |
| userId      |  integer  | not null, foreign key           |
| title       |   string  | no constraints                  |
| body        | text      | no constraints                  |   
| photo       | string    | no constraints                  |

* Unique index on `userId`
* `photo` will be URL to picture using [AWS](https://aws.amazon.com/s3/)
* A `journal entry` belongs to a `user`
<br />
<br />

### `Drawings`
| Column Name | Data Type | Details                         |
|-------------|:---------:|---------------------------------|
| id          |  integer  | not null, primary key           |
| userId      |  integer  | not null, foreign key           |
| title       |   string  | no constraints                  |   
| image       |   string  | not null                        |

* Unique index on `userId`
* `image` will be an object containing gridpoints from `react-canvas-draw npm` component library
* A `drawing` belongs to a `user`
<br />
<br />

### `Comments`
| Column Name | Data Type | Details               |
|-------------|:---------:|-----------------------|
| id          |  integer  | not null, primary key |
| userId      |  integer  | not null, foreign key |
| message     |   text    | not null              |
| friendId    |  integer  | not null, foreign key |

* Unique index on `userId` and `friendId`
<br />
<br />

### `Friends` (Join Table)
| Column Name | Data Type | Details               |
|-------------|:---------:|-----------------------|
| userId      |  integer  | not null              |
| friendId    |  integer  | not null              |
<br />
<br />

![DB](./project_planning/serenity_dbschema.png)
<br />
<br />

## WIREFRAMES
**PATH**: `"/"`
![Splash Page](./project_planning/SplashPage.png)
<br />
<br />

**PATH**: `"/signup"`
![Signup Modal](./project_planning/SignupModal.png)
<br />
<br />

**PATH**: `"/login"`
![Login Modal](./project_planning/LoginModal.png)
<br />
<br />

**PATH**: `"/dashboard"`
![Dashboard Page](./project_planning/Dashboard.png)
<br />
<br />

**PATH**: `"/new/journal"`
![New Journal Page](./project_planning/JournalEntryModal.png)
<br />
<br />

**PATH**: `"/new/canvas"`
![New Canvas Page](./project_planning/CanvasModal.png)
<br />
<br />

**PATH**: `"/new/comment"`
![New Comment Page](./project_planning/NiceCommentModal.png)
<br />
<br />

**PATH**: `"/dashboard"`
![New Comment Page](./project_planning/DrawerWithNotification.png)
<br />
<br />

**PATH**: `"/inbox"`
![New Comment Page](./project_planning/UserInbox.png)
<br />
<br />

**PATH**: `"/journal/:id"`

**PATH**: `"/journal/all"`

**PATH**: `"/canvas/:id"`

**PATH**: `"/canvas/all"`

## API Routes
   * auth_routes: `"/auth"`
      * GET
         * Authenticate a user: `""`
         * Logout a user: `"/logout"`
         * Unauthorized route: `"/unauthorized"`
      * POST
         * Login a user: `"/login"`
         * Signup a user: `"/signup"`

   * journal_routes: `"/journal"`
      * GET
         * All journal entries: `"/entries"`
         * A journal entry: `"/<int:id>"`
      * POST
         * Create journal entry: `"/new"`
      * DELETE
         * Remove journal entry: `"/<int:id>/delete"`
   * canvas_routes: `"/canvas"`
      * GET
         * All canvas drawings: `"/drawings"`
         * A canvas drawing: `"/<int:id>"`
      * POST
         * Publish a drawing: `"/new"`
      * DELETE
         * Remove a drawing: `"/<int:id>/delete"`
   * message_routes: `"/inbox"`
      * GET
         * All messages: `"/inbox"`
      * POST
         * Send a message: `"/new"`
<br />
<br />      

## Components List
  * Splash Page
  * Login Modal
  * Signup Modal
  * Calendar/Dashboard Page
  * Journal Modal
  * Canvas Modal
  * Comment Modal
  * Drawer Component
  * Inbox Component
  * Footer Component
<br />
<br />

## Technologies
   * React
   * Redux
   * Flask
   * SQLAlchemy
   * react-calendar npm
   * react-canvas-draw npm
