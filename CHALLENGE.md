# Mobile Challenge

## Prerequisites

- Clone this repository to your machine.
- Do not change the repository structure. If you change it, let us know why in the README.
- Write your code in a clear and professional manner. Avoid using any sketchy or poorly written code as it will not allow us to accurately evaluate your skills.
- In case of any questions regarding the challenge, please, contact a member of the hiring team who shared this challenge with you.

## Introduction

This is a minimal React Native app for mobile that includes:

- A theme for styling.
- Pre-built components for you to use in the project. You should be able to locate them.
- A fake REST API for data fetch.

### Notes

- The challenge _must_ be implemented using TypeScript.
- Data fetching _must_ be handled using Redux.
- Any _open-source_ library can be used, let us know why in the README.

## Tasks

### 1) Pagination with Pull-Down-To-Refresh

###### Initial Loading

- Show a loading spinner with the text `Loading tournaments ...` while fetching the initial set of tournaments.

###### Error Handling

- If fetching fails, display `Something went wrong.` along with a `RETRY` button.
- Tapping the `RETRY` button should attempt to fetch the tournaments again.

###### Displaying Tournaments

- Display the tournaments when the initial fetch succeeds.

###### No Tournaments

- If the fetch result returns empty, show `No tournaments found.`

###### Paginated Loading

- The initial load should display a limited set of tournaments (e.g., the first 10).
- As the user scrolls towards the bottom, automatically fetch, load, and append the next set of tournaments to the list.

###### Pull-Down-To-Refresh

- Implement a pull-down-to-refresh mechanism at the top of the list.
- On pull-down, refresh the list starting from the first set of tournaments.
- Display a visual indicator (like a spinner or loading icon) during the refresh action.
- After the refresh, ensure the list transitions back to its initial position smoothly.lement pagination for the tournament list.

### 2) Edit a tournament

- Tapping the `EDIT` button opens a modal or prompt with an input field pre-filled with the current tournament name. Buttons include `Cancel` and `Update`.
- The tournament name must contain only Latin letters, numbers, and spaces, not an empty string or only spaces.
- On tapping `Update`, the tournament name is optimistically updated in the UI with a rollback mechanism.

### 3) Delete a tournament

- Tapping the `DELETE` button opens a modal or dialog box with the message `Do you really want to delete this tournament?` and the buttons `Cancel` and `Confirm`.
- On tapping `Confirm`, the tournament is optimistically deleted in the UI with a rollback mechanism.

### 4) Search tournaments

Requirements:

- The search should be performed by calling the endpoint with the search term.
- Search should be triggered by user input, not after pressing `Search` button on keyboard.

###### Search Functionality with Pagination and Pull-Down-To-Refresh

###### Implementing the Search Bar

- Add a responsive search bar at the top of the tournament list. This should have a clear visual indication (e.g., a magnifying glass icon) and a placeholder text saying "Search tournaments...".

- As the user types into the search bar, provide a way to reset the search (e.g., an "X" icon at the end of the search bar that appears when the user starts typing).

###### Loading Feedback

- Upon initiating a search, display a loading spinner with the text `Loading tournaments...` to indicate data fetching in progress.

###### Error Handling

- If there's an issue fetching search results, display `Something went wrong.`.

- Offer a `RETRY` button alongside the error message. Tapping this should re-initiate the search based on the last entered query.

###### Display Search Results with Pagination

- Once the data fetch is successful, present the search results as a paginated list of tournaments.

- Initially, load and display a limited set of search results (e.g., the first 10 tournaments).

- As users scroll to the end of the current list, automatically fetch and display more results, appending them to the current list.

###### Pull-Down-To-Refresh for Search

- Implement a pull-down-to-refresh functionality on the search results list.

- When users pull down, refresh the search results starting from the first set, based on the current search query.

- Use a visual indicator (like a spinner or loading icon) during the refresh action.

###### Handling No Results

- If a search query returns no results, display `No tournaments found.` and consider offering tips to help users refine their search.

###### Performance Optimization

- Optimize the search functionality. For instance, implement a mechanism to reduce the frequency of API calls.

### 5) Create a tournament

- Add a floating action button (FAB) labeled `+`.
- Tapping the FAB opens a modal or prompt to enter the tournament name.
- The tournament name must contain only Latin letters, numbers, and spaces, not an empty string or only spaces.
- When `OK` is selected, the tournament is created on the fake REST API and at the start of the tournament list without any loading indicators.

### 6) Style it

- Tournaments have a border radius of `4px`.
- The tournament name uses the heading size `h6`.
- The `Start` date is displayed in the format `DD/MM/YYYY, HH:mm:ss` (`en-GB` locale).
- The horizontal spacing between the `EDIT` and `DELETE` buttons is `8px`.
- The horizontal spacing between tournament and screen is `16px`.
- The vertical spacing between each tournament is `24px`.

### 7) Make it responsive

- Ensure the layout is optimized for various mobile screens, from small phones to large tablets.

### Nice-to-Have Enhancements

Before diving into these enhancements, it's crucial to note the following:

- **These are optional tasks.** While they offer an opportunity for you to showcase a broader range of skills and your attention to detail, they are by no means a requirement for the completion of this challenge.

- **You do not have to implement all of them.** If you choose to tackle any, pick those you feel most comfortable with or those that would best demonstrate your proficiency and creativity.

- **Main tasks come first.** Ensure the core tasks outlined in the main challenge are well-executed before considering these enhancements. We value solid and functional core features over additional, yet possibly unstable, enhancements.

With that said, if you're up for the challenge, here are some advanced features you can consider:

#### 1) Tournament Details Screen

###### Detailed View of Tournaments

- Implement a separate screen or modal view that displays comprehensive details of a tournament when a user taps on a particular tournament from the list.

#### 2) Transitions and Animations

###### List Animations

- When tournaments are loaded or a new one is added, animate the list items in a staggered fashion using `react-native-reanimated`.

###### Refresh Animation

- Implement a custom pull-to-refresh animation in the tournaments list.

###### Button Feedback

- Provide visual feedback using subtle animations when buttons (`EDIT`, `DELETE`, `RETRY`, `CREATE TOURNAMENT`, etc.) are pressed.

###### Search Bar Animation

- Animate the search bar's appearance and disappearance as it's focused or blurred.

#### 3) Enhanced User Experience

###### Swipe to Edit or Delete

- Allow users to swipe left or right on a tournament item to reveal `EDIT` and `DELETE` options. Incorporate smooth animations during the swipe.

###### Optimistic Feedback

- When a user edits or deletes a tournament, provide a subtle, temporary visual cue (like a toast or snackbar) that indicates the action is in progress and awaiting confirmation from the backend.

#### 4) Advanced Interactions

###### Drag and Drop

- Allow users to reorder tournaments through a drag-and-drop mechanism, ensuring the movement is smooth and fluid using `react-native-reanimated`.

###### Gesture-Based Navigation

- Implement a gesture-based navigation for moving between different screens or dismissing modals. For instance, a swipe-down gesture could close a modal.

## Submission instructions

- Create a `ZIP` file with your solution.
- Include the .git folder to the `ZIP` file to facilitate code review.
- Send the `ZIP` file to the recruiter who provided this challenge.
- Do not include the `node_modules` folder in the `ZIP` file.
