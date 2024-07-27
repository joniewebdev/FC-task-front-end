document.addEventListener("DOMContentLoaded", () => {
    let apiUrl = "https://bored-api.appbrewery.com/random";
    let requestCount = 15;
    let api_content = [];

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function fetchData() {
        for (let i = 0; i < requestCount; i++) {
            let response = await fetch(apiUrl);
            let data = await response.json();
            api_content.push(data);
            await delay(2000); //to avoid too many request error
            appendToTable();
        }
    }

    function appendToTable() {
        let table = document.querySelector("#table tbody");
        table.innerHTML = ""; //clear

        api_content.forEach(item => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.activity}</td>
                <td>${item.availability}</td>
                <td>${item.type}</td>
                <td>${item.participants}</td>
                <td>${item.price}</td>
                <td>${item.accessibility}</td>
                <td>${item.duration}</td>
                <td>${item.kidFriendly}</td>
                <td>${item.link}</td>
                <td>${item.key}</td>
            `;
            table.appendChild(row);
        });
    };

    function downloadJSONfile() {
        let blob = new Blob([JSON.stringify(api_content, null, 2)], {type: "application/json"});
        let download_url = URL.createObjectURL(blob);
        let download_link = document.createElement("a");
        download_link.href = download_url;
        download_link.download = "api_content.json";
        download_link.click();
        URL.revokeObjectURL(download_url);
    };

    function downloadCSVfile() {
        header = "Activity,Availability,Type,Participants,Price,Accesibility,Duration,Kid Friendly,Link,Key\n";
        rows = api_content.map(item => 
            `${item.activity},${item.availability},${item.type},${item.participants},${item.price},${item.accessibility},${item.duration},${item.kidFriendly},${item.link},${item.key}`
        ).join("\n");
        tableContent = header + rows;
        blob = new Blob([tableContent], { type: "text/csv" });
        download_url = URL.createObjectURL(blob)
        download_link = document.createElement("a");
        download_link.href = download_url;
        download_link.download = "api_content.csv";
        download_link.click();
        URL.revokeObjectURL(download_url);
    };

    function printToConsole() {
        console.log(api_content);
    };

    document.getElementById("download-json").addEventListener("click", downloadJSONfile);
    document.getElementById("download-csv").addEventListener("click", downloadCSVfile);
    document.getElementById("print-to-console").addEventListener("click", printToConsole);

    fetchData();
});
