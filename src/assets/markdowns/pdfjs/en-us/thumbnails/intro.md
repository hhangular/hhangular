# `<pdfjs-thumbnails>`

The `<pdfjs-thumbnails>`  component is the miniature container of a `PDF` document.


### Case 1: One component`<pdfjs-thumbnails>`

In the event that only one `PDF` is displayed at a `t` moment. This component must have at least a definition `PdfjsControl`.

The `PdfjsControl` allows you to control the `PDF` document. 
It works much the same way as the 'FormControl' classes.

```html
<!--In template-->
<pdfjs-thumbnails [pdfjsControl]="pdfjsControl"> </pdfjs-thumbnails>
``` 

```typescript
// In controller
pdfjsControl: PdfjsControl = new PdfjsControl();

ngOnInit():void {
   this.pdfjsControl.load('assets/pdfs/guide.pdf');
}
```

### Case 2: Several components `<pdfjs-thumbnails>`

In the event that several `<pdfjs-thumbnails>` components coexist, 
you should also use a `PdfjsGroupControl`.    
One can in the same way as `FormGroupControl` components.   
Indeed it is necessary to have control over the container that is active. The class `PdfjsGroupControl` helps manage this.

Clearly you want to display 2 (or more) `PDF` at the same time, at least their miniatures, but a single viewing component `pdfjs-view`.    
This allows, for example, to have a `PDF` source part, where we will load different `PDF`, and a `PDF` part in editing.    
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
<!-- First PDF -->
<pdfjs-thumbnails  [pdfjsControl]="pdfjsControl1"  [pdfjsGroupControl]="pdfjsGroupControl">
</pdfjs-thumbnails>
<!-- Second PDF -->
<pdfjs-thumbnails  [pdfjsControl]="pdfjsControl2"  [pdfjsGroupControl]="pdfjsGroupControl">
</pdfjs-thumbnails>
``` 

