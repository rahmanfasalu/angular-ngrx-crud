import { Pipe, PipeTransform } from "@angular/core";

/**
 * The pipe convert metric to imeperial
 * base unit set as metric.
 */
@Pipe({ name: "fileterVideoQuality" })
export class FilterVideoQuality implements PipeTransform {
  transform(value: any): string {
    var resArr = [];
    var max = 0;
    var resObj = {
      res: "",
      size: null,
      key: null,
    };
    var format;
    for (let key of Object.keys(value)) {
      format = value[key];
      let resalution = +format.res.replace(/\D/g, "");
      if (resalution > max) {
        resArr = [];

        max = resalution;
      }
      if (resalution >= max) {
        resArr.push({
          res: format.res,
          size: format.size,
          key: key,
        });
      }
    }

    if (resArr.length > 1) {
      resObj = resArr.reduce(function (prev, current) {
        return prev.size > current.size ? prev : current;
      });
    } else {
      resObj = (resArr.length && resArr[0]) || resObj;
    }
    return `${resObj.key} ${resObj.res}`;
  }
}
