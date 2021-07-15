export function weatherIconConverter(iconNum){
  return iconNum < 10? '0' + iconNum : iconNum;
}
