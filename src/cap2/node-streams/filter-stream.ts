import { Transform } from "stream";
export class FilterTransform extends Transform {
  private filterProps: Array<String>;
  constructor(filterprops: Array<String>, options?: any) {
    if (!options) options = {};
    options.objectMode = true;
    super(options);
    this.filterProps = filterprops;
  }
  _transform(chunk: any, encoding?: string, callback?: Function) {
    let filteredKeys = Object.keys(chunk).filter((key) => {
      return this.filterProps.indexOf(key) == -1;
    });
    let filteredObj = filteredKeys.reduce((accum: any, key: any) => {
    accum[key] = chunk[key];
      return accum;
    }, {})
    this.push(filteredObj);
    callback === undefined ? undefined : callback();
  }
  _flush(cb: Function) {
    console.log("this method is called at the end of all transformations");
  }
}