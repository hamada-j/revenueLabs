export const mergeObjects = (arr,output) => {
  arr.forEach(function(item) {
    let existing = output.filter(function(v, i) {
      return v.name == item.name;
    });
    if (existing.length) {
      let existingIndex = output.indexOf(existing[0]);
      output[existingIndex].value = output[existingIndex].value.concat(item.value);
    } else {
      if (typeof item.value == 'string')
        item.value = [item.value];
        output.push(item);
    }
  });
}
