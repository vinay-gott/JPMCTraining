function getData()
{
    fetch("http://localhost:3000/users")
    .then(response=>response.json())
    .then(data=>{
        var tbody=""
        for(var item of data){
            var temp=""
            temp = '<tr><td>' + item.id + '</td>';
            temp+= '<td>' + item.name+ '</td>';
            temp+= '<td>' + item.branch + '</td>';
            temp+= '<td>' + item.email + '</td>';
            temp+=`<td><button onclick="updateData(${item.id})">Update Data</button>`
            temp+=`<button onclick="deleteData(${item.id})">Delete Data</button></td></tr>`
            tbody+=temp;
        }
        document.getElementById("tbody").innerHTML=tbody
    }
)

}
function addData(Event)
{
    event.preventDefault(); // Prevent default form submission behavior
    
    let id=document.getElementById("id").value
    let name=document.getElementById("name").value
    let branch=document.getElementById("branch").value
    let email=document.getElementById("email").value
    
    // Send POST request to add new user
    fetch("http://localhost:3000/users",{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id,
            name,
            branch,
            email
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add user');
        }
        return response.json();
    })
    .then(data => {
        // Refresh data after successful addition
        getData();
    })
    .catch(error => {
        console.error('Error adding user:', error);
        // Handle error
    });
}
function deleteData(id1)
{
    fetch("http://localhost:3000/users/"+id1,{
        method:"DELETE"
    })
    .then(response=>response.json())
    .catch(err=>console.log(err))
    getData()
}
function updateData(id2)
{
    let id=document.getElementById("id").value
    let name=document.getElementById("name").value
    let branch=document.getElementById("branch").value
    let email=document.getElementById("email").value
    fetch(`http://localhost:3000/users/${id2}`,{
        method:"PATCH",
        body:JSON.stringify({
            "id":id,
            "name":name,
            "branch":branch,
            "email":email
        })
    })
    .then(response=>response.json())
    .then(data=>console.log(data))
    getData()
}
