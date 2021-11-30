# Project Overview
## Project Links
- [Github Repository for the backend](https://github.com/NODEMONSTERS/dogwalker-api)
- [Github Repository for the frontend](https://github.com/NODEMONSTERS/dogwalker-client)

## Project Description

This app will allow dog owners and people with free time looking for a job together, and satisfy both parties needs in having a dog(s), walked and income made.

## React Architecture

- [React Architecture]()

## Wireframes

- [Wireframe]('./dog_walker_wireframe.jpg)

## MVP/Post MVP
#### MVP

- Team Page - A page to list the collaborators for the project
- Sign up - creates a DogOwner and DogWalker using the appropriate models
- DogOwner Model - able to update profile information
- DogWalker Model - able to update profile information
- Dog Schema - owner can CRUD a list of dogs (sub-document of Owner model)
- Request - Dog walker model can interact with owner model
- DogWalkers can see a list of DogOwners with their respective dogs
- DogOwners can see a list of DogWalkers

#### PostMVP

- Elaborate Request, relationship between DogOwner and DogWalker runs both ways
- Completed component where DogOwners can see walked requests that have been fulfilled
- Filter DogOwners/DogWalkers by city

## Components

| Components(MVP) | Description |
| --- | :---: |
| App | Set up app with React Router, also the homepage with Navbar |
| NavBar | Renders the Navbar with its functionality |
| Team Page | A page to introduce the team! |
| Sign-up | Creates new users, either DogOwner or DogWalker |
| Dogs | List of Dogs |
| DogWalkers | List of DogWalkers
| DogOwner | Shows a list of dogs respective to the Owner |
| dogOwnerController | Creates the routes for the api call for the dog Owner |
| Request | Also/database that contains id from the DogOwner and DogWalker to CRUD their respective databases |


| Components(PostMVP) | Description |
| --- | :---: |
| Elaborate Request | Run the CRUD relationship both ways between the DogOwner and DogWalker databases |
| Complete Component | Creating a list of completed Walks/Requests (Also adding a new key to describe process) |
| Filter | Filtered GET method/functionality in list of DogOwners/DogWalkers |


#### Time Table

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: | :---: | :---: | :---: |
| App | H | 1hr | 1hr | 1hr |
| NavBar | H | 2hr | 3hr | 3hr |
| Team Page | H | 1hr | 1hr | 1hr |
| Sign-up | H | 1hr | 5hr | 5hr |
| Log-in | H | 1hr | 3hr | 3hr |
| Dogs | H | 1hr | 1hr | 1hr |
| DogWalkers | H | 2hr | 3hr | 3hr |
| DogOwners | H | 2hr | 3hr | 3hr |
| Request | H | 2hr | 2hr | 2hr |
| Bootstrap Styling | H | 7hr | 10hr | 10hr |
| CSS | M | 5hr | 1hr |  |
| UpdateRequest(PostMVP) | L | 2hr |  |  |
| Complete | L | 2hr |  |  |
| Filter | L | 2hr |  |  |
| PostMVP CSS | L | 5hr |  |  |
| Total (MVP) | H | 25hr | 32hr | 32hr |
| Total (PostMVP) | L | 11hr | 0hr |



## Additional Libraries

- [React Bootstrap](https://react-bootstrap.netlify.app/)

## Code Snippet

```
router.post('/login', (req, res, next) => {
	passport.authenticate('local-owner', (err, user, info) => {
		if (err) throw err;
		if (!user) res.status(400).json({ msg: 'Invalid credentials' });
		else {
			req.logIn(user, (err) => {
				if (err) throw err;
				res.json({user});
				console.log(req.user);
			});
		}
	})(req, res, next);
});
```