# User Icons
User Icons is a small Javascript project to make generating an icon for a user simple. This project
aims to generate icons that are similar to Google's.

There is a lot more work to be done before the first release.

## Usage
Using this project is simple. All that is needed is the following

```html
<html>
<head>
    <script src="js/index.js"></script>
</head>
</html>
<body>

<script>
    var myIcon = new UserIcon('harrison.kelly');
    document.body.appendChild(myIcon);
</script>
</body>

````

That short amount of code will give you an icon with for the user's name.

## Supported So Far
Currently, the following delimeters are supported
* '-'
* '.'
* '_'

## TODO
* Add support for changing the shape.
* Much much more.