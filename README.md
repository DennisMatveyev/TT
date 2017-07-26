# User Status Management

### Technologies
- Python 3.5
- Django 1.11
- DRF 3.6
- Angular 4

### Quick Start Django
Create virtual environment, and install the requirements.

```sh
$ mkvirtualenv --python=python3.5 userstatus
$ workon userstatus
$ pip install -r requirements.txt
```

Make Django migrations and migrate.
```sh
$ ./manage.py makemigrations
$ ./manage.py migrate
```

Test it.
```sh
./manage.py test
```

Run test server.
```sh
$ ./manage.py runserver
```

### Quick Start Angular
```sh
$npm install
$ npm install -g @angular/cli
$ ng serve
```
