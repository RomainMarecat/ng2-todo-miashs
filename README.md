# Todo List

## A Todo app example featuring ngrx/store - RxJS powered state management inspired by Redux for Angular apps.

- ngrx/store
- ngrx/effects
- ngrx/store-devtools
- ngrx/db
- RxJS
- Material Angular
- SCSS
- @angular-cli

Pour contribuer :
```
git clone https://github.com/RomainMarecat/ng2-todo-miashs.git
cd ng2-todo-miashs
git checkout -b feat/your-feature
npm install
npm install -g @angular/cli
ng serve
```
Fais ta feature.
```
ng lint
ng build
git add *
git commit -m "Your feature description"
git push origin feat/your-feature
```
Sur bitbucket, Crée ta PR (Pull Request)

-----

Pour récupérer les nouvelles MAJ,
```
git checkout master
git pull origin master
git checkout feat/your-feature
git rebase master
```
Si il y a un conflit ?
Résoudre le conflit
while (conflit) {
```
git add *
git rebase --continue
git push origin feat/your-feature -f
```
}

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build -aot -prod --base-href "https://romainmarecat.github.io/ng2-todo-miashs/"` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
Add 404 page :
`cp dist/index.html dist/404.html`

## Deploy on github
ngh