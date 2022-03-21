# habit-calendar

A big focus of mine has recently been to work on building better habits and better systems. Implementing good routines and habits isn't something that happens overnight, and I wanted to build something akin to my carved rubber stamps and paper calendar to help keep me on track.

The intention behind the design of this project was to create something welcoming and easy to use. I opted to implement OAuth2 user authentication via Auth0's platform. This allows for easy login - sign up and the option to log in with your Google credentials. I also wanted to customize the colours/ theme at will and was able to set that up using Material UI, its theming features, and its customizable palettes.

This project was built using HTML, CSS, React, NodeJs, MongoDB, Autho0 and the customizable Material UI Component Library

**Try it here:** [_https://habit-calendar.vercel.app_](https://habit-calendar.vercel.app)

![boulette_s](https://raw.githubusercontent.com/melansonS/habit-calendar/main/public/calendar_demo.png)

## Usage

Feel free to sign up for your account or use the demo credentials. To prevent checking days off in advance or retroactively filling in all the days you may have missed; you can only update one day at a time. Be sure to check off each day on the day if you want to grow your streak.

#### Credentials:

- username: demo@yopmail.com
- password: demoPassword123

_Mind the spin up time for the backend hosted on Heroku_

## Roadmap

There are still a couple of things that I'm looking to update and implement on this project:

- Features:
  - Multiple named calendars for when you're trying to build more than one habit
  - Social elements such as viewing connections' calendars, streaks as well as a ping/reminder to help keep them accountable
- Migrate the back end off of Heroku for seamless start up and usage
