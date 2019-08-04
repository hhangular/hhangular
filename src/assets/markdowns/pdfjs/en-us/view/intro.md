# `<pdfjs-view>`

The `<pdfjs-view>` component allows you to view a page of a `PDF`.

### Case 1: Only one `pdfjsControl` allows to navigate in` PDF`

In the case that only one `PDF` is displayed at a time` t`. This component must have a `PdfjsControl` set on the` control` attribute.

The `PdfjsControl` allows you to control the` PDF` document.    
It works much like the `FormControl` classes.

```html
<!--In template-->
<pdfjs-view [control]="pdfjsControl"> </pdfjs-view>
``` 

```typescript
// In controller
pdfjsControl: PdfjsControl = new PdfjsControl();

ngOnInit():void {
   this.pdfjsControl.load('assets/pdfs/guide.pdf');
}
```

### Case 2: More than one `pdfjsControl` allow to navigate in several` PDF`

In the case where more than one component `pdfjsControl` allow to navigate in different` PDF`,
you must also use a `PdfjsGroupControl`.
    
In much the same way as the `FormGroupControl` components.

Indeed it is necessary to have a control on the container that is active. The `PdfjsGroupControl` class can handle this.

Clearly you want to display 2 (or more) `PDF` at the same time, at least their thumbnails, but only one component of visualization `pdfjs-view`.
    
This allows for example to have a part `PDF` source, where we will load different` PDF`, and a `PDF` in edition.
     
Allowing you to compose a new `PDF` from different sources.

```typescript
// In controller
pdfjsGroupControl: PdfjsGroupControl = new PdfjsGroupControl();
pdfjsControl1: PdfjsControl = new PdfjsControl();
pdfjsControl2: PdfjsControl = new PdfjsControl();

ngOnInit():void {
   this.pdfjsControl1.load('assets/pdfs/guide.pdf');
   this.pdfjsControl2.load('https://mydomain.com/assets/pdfs/other.pdf');
   this.pdfjsGroupControl.select(this.pdfjsControl1);
}
```

```html
<!--In template-->
<!-- Premier PDF -->
<pdfjs-thumbnails  [pdfjsControl]="pdfjsControl1"  [pdfjsGroupControl]="pdfjsGroupControl"></pdfjs-thumbnails>
<!-- Deuxième PDF -->
<pdfjs-thumbnails  [pdfjsControl]="pdfjsControl2"  [pdfjsGroupControl]="pdfjsGroupControl"></pdfjs-thumbnails>
<!-- Visualisation -->
<pdfjs-view  [control]="pdfjsGroupControl"></pdfjs-view>
``` 

