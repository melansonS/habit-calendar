# habit-calendar


A big focus of mine has recently been to work on building better habits and better systems. Implementing good routines and habits isn't something that just happens over night and I wanted to build something akin to my carved rubber stamps and paper calendar to help keep me on track.

The intention behind the design of this project was to create something that is welcoming and easy to use. I opted to implement OAuth2 user authetication via Auth0's platform. This allows for easy log in - sign up as well as the option to log in with your Google credentials. I also wanted to be able customize the colors/ theme at will and was able to set that up using Material UI, it's theming features and it's customizeable palettes.

This project was built using HTML, CSS, React, NodeJs, MongoDB, Autho0 and the customizable Material UI Component Library

**Try it here:** [_https://habit-calendar.vercel.app_](https://habit-calendar.vercel.app)

![boulette_s](https://raw.githubusercontent.com/melansonS/habit-calendar/main/public/calendar_demo.png)

## Usage

Feel free to sign up for your own account or use the provided demo credentials. In order to prevent checking days off in advance, or retroactively filling in all the days you may have missed, you can only update one day at a time. Be sure to check off each day on the day if you want to grow your streak.

#### Credentials:

- username: demo@yopmail.com
- password: demoPassword123

_Mind the spin up time for the backend hosted on Heroku_

## Roadmap

There are sill a couple of things that I'm looking to update and implement on this project such as;

- Features:
  - Multiple named calendars for when you're trying to build more than one habit
  - Social elements such as viewing connections' calendars, streaks as well as a ping/reminder them to help keep them accountable
- Migrate the back end off of Heroku for seamless start up and usage
