
/**Ulisesten */

/**User Info */
var mUsername = localStorage.username;
var mId = localStorage.id;
var mToken = localStorage.token;


/**Utils */
function getEl(id){
    return document.getElementById(id);
}

function newEl(el){
    return document.createElement(el);
}

var queryHeaders =  new Headers();


queryHeaders.append('Content-Type','application/json; charset=utf-8');
queryHeaders.append('Authorization', 'Bearer ' + mToken);



/**GET functions */
function getData(url, callback){

    fetch( url, {
        credentials: 'include',
        headers: queryHeaders,
        method: 'GET'
    }).then( res => {

        if( !res.ok ){
            console.log('getProduct: Error');
            return;
        }

        return res.json();

    }).then( res => {

        if( res !== null ){
            callback(res)
        }
        
    });

}


/**Side Bar */
var toggleMenu = getEl('toggle-menu');
var toggledMenu = getEl('toggled-menu');
var sideBarMenu = getEl('sidebar-menu');

toggleMenu.addEventListener('click', ()=>{
    sideBarMenu.style.transform = 'translateX(0%)';
    toggleMenu.style.display = 'none';
    toggledMenu.style.display = 'block';
});

toggledMenu.addEventListener('click', ()=>{
    sideBarMenu.style.transform = 'translateX(-100%)';
    toggleMenu.style.display = 'block';
    toggledMenu.style.display = 'none';
});




if( mId === undefined || mUsername === undefined)
    window.location.href = '/signin';
else {


/**Getting covers */
//getData( '/getCovers', coverCallback ); 
/**Getting products */

function bugView(info){

    return `
                <td>
                    <a href="/getBugDetails?id=${info.id}">${info.id}</a>
                                                                            </td>
                <td>${info.bug_title}                                       </td>
                <td class="${info.priority}">${info.priority}               </td>
                <td>${info.severity}                                        </td>
                <td>${info.status}                                          </td>
                <td>${info.tester_id}                                       </td>
                <td>${info.area}                                            </td>`;

}

function bugCallback(data){
    console.log(data);
    
    
    var table = getEl('bug-table');
    
    data.forEach((el)=>{
        var tr = newEl('tr');
        tr.innerHTML = bugView(el);
        table.append(tr);
    })

}


getData( '/getBugs', bugCallback);

var socket = io();


}/**else end */





