Contributors: Laura, Colin, Phoebe, Mal

Heroku Url: https://command-line-physician.herokuapp.com/

Tech stack:
Command-line Physician is a RESTful api that utilizes Node, Express, Jest, end-to-end and unit testing. Our testing was carried out by Compass, Robo 3T, and Postman.

Brief description: 
Our intention with this app is to let users find natural herbal based remedies for their ailments. Our app allows users to browse our specially curated herb database by name and latin name. Command-Line Physician also allows users to locate the nearest store where they can find their unique remedy, or a local resident who has the herb available to share.

Models:
  User routes: 
  - signup a user
  - signin as a user
  - verify user

  Herb routes:
  - return all herbs
  - return an herb by latin name/common name && locate stores by herb name
  - create an herb *
  - update an herb *
  - delete an herb *
  - locate locals with specified herb
  - returns a list of top herb database contributors (AGGREGATION)

  Faves routes:
  - create a favorite herb *
  - delete a favorite herb *

  * indicates a user must be signed in to perform these actions

MIDDLEWARE:
  - ensures a user's authorization by verifying a json web token(JWT)
  - Google store locator API
  - links with food sharing API










  
{
            "name": "LAVENDER",
            "category": "nervine & antispasmodic",
            "latin_name": "lobelia inflata",
            "medicinal_uses": "cures everything",
            "description": "is a smart herb",
            "user": "5cca0c9657ce38f0b77e2636"
          }
