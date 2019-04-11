document.getElementById("button").onclick = function() {loadImages()};


function loadImages(){
    document.getElementById("
    var images = ['https://scontent-sjc3-1.cdninstagram.com/vp/d6cb5af68f409d491e4c904efbfd0bf4/5D1923EF/t51.2885-15/e35/41067913_167899370754429_2405070674913506291_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&se=7&ig_cache_key=MTg3NDE5NTU4MzQzMjMwODU5Nw%3D%3D.2',
		  'https://scontent-sjc3-1.cdninstagram.com/vp/321e17c233486dc841916721601c3711/5D1ECEED/t51.2885-15/e35/42004166_164824904446528_4005515856921320727_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&se=7&ig_cache_key=MTg4NTIxNjU3MjM5MTY3NjAyMQ%3D%3D.2',
		  'https://scontent-sjc3-1.cdninstagram.com/vp/1369de1229cad9d3b9a6a2e6bee80aab/5D263A39/t51.2885-15/e35/51414979_2444790255550681_4583398625905637787_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&se=8&ig_cache_key=MTk3NDMzNzA5NDY3NjY2NTk0NA%3D%3D.2',
		  'https://scontent-sjc3-1.cdninstagram.com/vp/6053a072d33b24a2fec91a158d25724b/5D09DF81/t51.2885-15/e35/37860239_279418736197264_9135160259067772928_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&se=7&ig_cache_key=MTgzNTc2NTUyODgxNzIyNTY0Nw%3D%3D.2'];
    

    for(var i=0; i< imgArr.length; i++) {
        console.log(imgArr[i]);
        var img = new Image();
	img.src = imgArr[i];
	console.log(img.src);
        document.getElementById('output').appendChild(img);
    }
}
