var pages = 0;
var payload = 20;
var start = 0;
var size = payload;
var counter = 1;
function CreateDailySales() {
    var newMessage = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"date\">DetailedSales</label>\n" +
        "                    <input type=\"date\" id=\"date\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <input type=\"submit\" id='btnSales' value=\"Find Report\" onclick=\"SendSales()\">\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = newMessage;
    document.getElementById('btnSales').addEventListener('click', function (event) {
        event.preventDefault();
    });

}
async function SendSales() {
    const obj = await sales();
    //console.log(obj)
    if (obj.success == true) {
        if (obj.count > 0) {
            rep = "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            pages = Math.ceil(obj.count / payload);
            rep += "<td align='left'>Page 1 of 1";
            rep += "<td align='left'></td>";
            rep += "<td align='right'><h5><a onclick='Previous()' class='my-link'>Detailed Sells Report : " + document.getElementById('date').value + "</h5></td>";
            rep += "<td align='right'><h5><a onclick='Next()' class='my-link'></h5></td>";
            rep += "</tr>";
            rep += "</table>";
            rep += "<table class='table-filled' border='2' width=\"100%\">";
            rep += "<tr>";
            rep += "<th>Username</th>";
            rep += "<th>Itemname</th>";
            rep += "<th>Quantity</th>";
            rep += "<th>Amount</th>";
            rep += "<th>Time</th>";
            rep += "</tr>";
            var c;
            var len = obj.data.length;
            for (c = 0; c < len; c++) {
                rep += "<tr>";
                rep += "<td>" + obj.data[c].username + "</td>";
                rep += "<td>" + obj.data[c].itemname + "</td>";
                rep += "<td>" + obj.data[c].quantity + "</td>";
                rep += "<td>" + obj.data[c].amount + "</td>";
                rep += "<td>" + obj.data[c].saleTime + "</td>";
                rep += "</tr>";
            }
            rep = rep + "</table>";
            rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            rep += "<td align='left'></td>";
            rep += "<td align='left'></td>";
            rep += "<td align='right'><h5><a onclick='Previous()' class='my-link'></a></h5></td>";
            rep += "<td align='right'><h5><a onclick='Next()' class='my-link'></a></h5></td>";
            rep += "</tr>";
            rep += "</table>";
            document.getElementById("main-container").innerHTML = rep;
        } else {
            rep = "<p class=no-record-response>No record found</p>";
            document.getElementById("main-container").innerHTML = rep;
        }
    }
}
async function sales() {
    const url = sessionStorage.getItem("host") + "/api/v1/sales/daily?storecode=" +
        sessionStorage.getItem('storecode') + "&saleDate=" +
        document.getElementById('date').value + "&username=" + sessionStorage.getItem('username')

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error:", error.message);
    }
}
function CreateDailyGrouping() {
    var newMessage = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"date\">SalesGrouping</label>\n" +
        "                    <input type=\"date\" id=\"dateDailyGrouping\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <input type=\"submit\" id='btnDailyGrouping' value=\"Find Report\" onclick=\"dateChange()\">\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = newMessage;
    document.getElementById('btnDailyGrouping').addEventListener('click', function (event) {
        event.preventDefault();
    });

}
async function SendDailyGrouping(date) {
    const obj = await dailyGrouping(date);
    if (obj.success == true) {
        if (obj.count > 0) {
            rep = "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            rep += "<td align='left'>Page 1 of 1";
            rep += "<td align='left'></td>";
            rep += "<td align='right'><h5><a onclick='Previous()' class='my-link'>Sells Grouping Report : " + document.getElementById('dateDailyGrouping').value + "</h5></td>";
            rep += "<td align='right'><h5><a onclick='Next()' class='my-link'></h5></td>";
            rep += "</tr>";
            rep += "</table>";
            rep += "<table class='table-filled' border='2' width=\"100%\">";
            rep += "<tr>";
            rep += "<th>ItemName</th>";
            rep += "<th>Quantity</th>";
            rep += "<th>Amount</th>";
            rep += "</tr>";
            var c;
            var total;
            total = 0;
            var len = obj.data.length;
            for (c = 0; c < len; c++) {
                rep += "<tr>";
                rep += "<td>" + obj.data[c].itemName + "</td>";
                rep += "<td>" + obj.data[c].quantity + "</td>";
                rep += "<td>" + obj.data[c].amount + "</td>";
                total = total + obj.data[c].amount;
                rep += "</tr>";
            }
            rep += "<tr>";
            rep += "<th></th>";
            rep += "<th></th>";
            rep += "<th>R: " + new Intl.NumberFormat('en-IN').format(total) + "</th>";
            rep += "</tr>";
            rep = rep + "</table>";
            rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            rep += "<td align='left'>Page 1 of 1";
            rep += "<td align='left'></td>";
            rep += "</tr>";
            rep += "</table>";
            document.getElementById("main-container").innerHTML = rep;
            //window.alert(total);
        } else {
            rep = "<p class=no-record-response>No record found</p>";
            document.getElementById("main-container").innerHTML = rep;
        }
    }
}
async function dailyGrouping(date) {
    const url = sessionStorage.getItem("host") + "/api/v1/sales/daily/grouping?storecode=" +
        sessionStorage.getItem('storecode') + "&username=" + sessionStorage.getItem('username')
        + "&saleDate=" + date;
    //console.log(url);
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error:", error.message);
    }
}
function CreateDailyUserSummary() {
    var newMessage = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"date\">SalesUserSummary</label>\n" +
        "                    <input type=\"date\" id=\"date\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <input type=\"submit\" id='btnDailyUserSummary' value=\"Find Report\" onclick=\"sendNewDailySummary()\">\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = newMessage;
    document.getElementById('btnDailyUserSummary').addEventListener('click', function (event) {
        event.preventDefault();
    });
}
async function sendNewDailySummary() {
    const obj = await newDailUserSummarysales();
    if (obj.success == true) {
        if (obj.count > 0) {
            rep = "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            pages = Math.ceil(obj.count / payload);
            rep += "<tr>";
            rep += "<td align='left'>Page 1 of 1";
            rep += "<td align='left'></td>";
            rep += "<td align='right'><h5><a onclick='Previous()' class='my-link'>Sells User Summary Report : " + document.getElementById('date').value + "</h5></td>";
            rep += "<td align='right'><h5><a onclick='Next()' class='my-link'></h5></td>";
            rep += "</tr>";
            rep += "</table>";
            rep += "<table class='table-filled' border='2' width=\"100%\">";
            rep += "<tr>";
            rep += "<th>Username</th>";
            rep += "<th>Total</th>";
            rep += "</tr>";
            var c;
            var total;
            total = 0;
            var len = obj.data.length;
            for (c = 0; c < len; c++) {
                rep += "<tr>";
                rep += "<td>" + obj.data[c].username + "</td>";
                rep += "<td>" + obj.data[c].total + "</td>";
                total = total + obj.data[c].total;
                rep += "</tr>";
            }
            rep += "<tr>";
            rep += "<th></th>";
            rep += "<th>R: " + new Intl.NumberFormat('en-IN').format(total) + "</th>";
            rep += "</tr>";
            rep = rep + "</table>";
            rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            rep += "<td align='left'>Page 1 of 1";
            rep += "<td align='left'></td>";
            rep += "<td align='right'><h5><a onclick='Previous()' class='my-link'></h5></td>";
            rep += "<td align='right'><h5><a onclick='Next()' class='my-link'></h5></td>";
            rep += "</tr>";
            rep += "</table>";
            document.getElementById("main-container").innerHTML = rep;
        } else {
            rep = "<p class=no-record-response>No record found</p>";
            document.getElementById("main-container").innerHTML = rep;
        }
    }
}
async function newDailUserSummarysales() {
    const url = sessionStorage.getItem("host") + "/api/v1/sales/daily/user/summary?storecode=" +
        sessionStorage.getItem('storecode') + "&username=" +
        sessionStorage.getItem('username') + "&saleDate=" + document.getElementById('date').value;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error:", error.message);
    }
}
function createMonthlyProfit() {
    const newMessage = `
        <div class="form-layout">
            <form class="login-form">
                <div class="igroup">
                    <label for="monthPicker">Select Month</label>
                    <input type="month" id="monthPicker" aria-describedby="info">
                </div>
                <input type="submit" id="btnDailyUserSummary" value="Find Report">
            </form>
        </div>`;

    document.getElementById("main-container").innerHTML = newMessage;

    document.getElementById('btnDailyUserSummary').addEventListener('click', function (event) {
        event.preventDefault();
        sendMonthlyProfit();
    });
}
// async function sendDailyProfit() {
//     document.getElementById('btnDailyUserSummary').value = "Processing..."
//     const obj = await dailyProfit();

//     if (obj.success == true) {
//         if (obj.count > 0) {
//             rep = "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
//             //rep += "<tr>";
//             //pages = Math.ceil(obj.count / payload);            
//             rep += "<tr>";
//             rep += "<td align='left'>Page 1 of 1";
//             rep += "<td align='left'></td>";
//             rep += "<td align='right'><h5><a onclick='Previous()' class='my-link'>Daily Profit Report : " + document.getElementById('date').value + "</h5></td>";
//             rep += "<td align='right'><h5><a onclick='Next()' class='my-link'></h5></td>";
//             rep += "</tr>";
//             rep += "</table>";
//             rep += "<table class='table-filled' border='2' width=\"100%\">";
//             rep += "<tr>";
//             rep += "<th>Itemname</th>";
//             rep += "<th>Quantity</th>";
//             rep += "<th>StockPrice</th>";
//             rep += "<th>SellingPrice</th>";
//             rep += "<th>Profit</th>";
//             rep += "</tr>";
//             var c;
//             var total;
//             total = 0;
//             var len = obj.data.length;
//             for (c = 0; c < len; c++) {
//                 rep += "<tr>";
//                 rep += "<td>" + obj.data[c].itemName + "</td>";
//                 rep += "<td>" + obj.data[c].quantity + "</td>";
//                 rep += "<td>" + obj.data[c].stockPrice + "</td>";
//                 rep += "<td>" + obj.data[c].sellPrice + "</td>";
//                 rep += "<td>" + obj.data[c].profit + "</td>";
//                 total = total + obj.data[c].profit;
//                 rep += "</tr>";
//             }
//             rep += "<tr>";
//             rep += "<th></th>";
//             rep += "<th></th>";
//             rep += "<th></th>";
//             rep += "<th></th>";
//             rep += "<th>R: " + new Intl.NumberFormat('en-IN').format(total) + "</th>";
//             rep += "</tr>";
//             rep = rep + "</table>";
//             rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
//             rep += "<tr>";
//             rep += "<td align='left'>Page 1 of 1";
//             rep += "<td align='left'></td>";
//             rep += "<td align='right'><h5><a onclick='Previous()' class='my-link'></a></h5></td>";
//             rep += "<td align='right'><h5><a onclick='Next()' class='my-link'></a></h5></td>";
//             rep += "</tr>";
//             rep += "</table>";
//             document.getElementById("main-container").innerHTML = rep;
//         } else {
//             const dummyLabels = ['Item A', 'Item B', 'Item C', 'Item D', 'Item E']; 
//             const dummyProfits = [150, 250, 100, 300, 200]; 
//             renderBarChart(dummyLabels, dummyProfits);

//             // rep = "<p class=no-record-response>No record found</p>";
//             // document.getElementById("main-container").innerHTML = rep;
//         }
//     }
// }

async function sendMonthlyProfit() {
    const button = document.getElementById('btnDailyUserSummary');
    button.value = "Processing...";

    try {
        const profits = await getProfitMonthly();

        if (profits.success && profits.data.length > 0) {
            console.log("profits", profits);

            const labels = profits.data.map(item => item.date);
            const profitData = profits.data.map(item => item.profit);

            renderBarChartWithLine(labels, profitData);

            button.value = "Find Report";
        } else {
            document.getElementById("main-container").innerHTML = "<p class='no-record-response'>No record found</p>";
        }
    } catch (error) {
        console.error("Error fetching profits:", error);
        document.getElementById("main-container").innerHTML = "<p class='no-record-response'>An error occurred</p>";
    } finally {
        button.value = "Find Report";
    }
}



async function getProfitMonthly() {
    const month = document.getElementById('monthPicker').value.split("-")[1]
    const year = document.getElementById('monthPicker').value.split("-")[0]
    const url = sessionStorage.getItem("host") + "/api/v1/profit/monthly?username=" +
        sessionStorage.getItem('username') + "&storecode=" +
        sessionStorage.getItem('storecode') + "&month=" + month + "&year=" + year;


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error:", error.message);
    }

}

function renderBarChartWithLine(labels, profits) {
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = '<canvas id="profitChart" style="width: 100%;"></canvas>';
    const canvas = document.getElementById('profitChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            if (window.profitChartInstance) {
                window.profitChartInstance.destroy();
            }

            const barColors = profits.map(profit => (profit >= 0 ? 'rgba(0, 123, 255, 0.7)' : 'rgba(255, 99, 132, 0.7)'));

            const cumulativeProfits = profits.reduce((acc, value, index) => {
                acc.push((acc[index - 1] || 0) + value);
                return acc;
            }, []);

            const chartData = {
                labels: labels,
                datasets: [
                    {
                        type: 'bar',
                        label: 'Daily Profit',
                        data: profits,
                        backgroundColor: barColors,
                        borderColor: barColors.map(color => color.replace('0.7', '1')),
                        borderWidth: 1,
                    },
                    {
                        type: 'line',
                        label: 'Cumulative Profit',
                        data: cumulativeProfits,
                        borderColor: 'rgba(75, 192, 19, 1)',
                        backgroundColor: 'rgba(75, 19, 192, 0.2)',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.2,
                        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                        pointRadius: 3,
                    }
                ]
            };

            const chartOptions = {
                responsive: true,
                plugins: {
                    legend: { display: true },
                    tooltip: { mode: 'index', intersect: false }
                },
                scales: {
                    x: {
                        title: { display: true, text: 'Days of November' }
                    },
                    y: {
                        title: { display: true, text: 'Profit' },
                        beginAtZero: false,
                        grid: {
                            drawBorder: true,
                            color: (ctx) => ctx.tick.value === 0 ? 'black' : 'rgba(200, 200, 200, 0.5)',
                        },
                    }
                }
            };

            window.profitChartInstance = new Chart(ctx, {
                type: 'bar', 
                data: chartData,
                options: chartOptions
            });
        } else {
            console.error('Failed to get canvas context.');
        }
    } else {
        console.error('Canvas element not found for rendering chart.');
    }
}


async function dailyProfit() {
    const url = sessionStorage.getItem("host") + "/api/v1/sales/profit?storecode=" +
        sessionStorage.getItem('storecode') + "&username=" +
        sessionStorage.getItem('username') + "&saleDate=" + document.getElementById('date').value;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error:", error.message);
    }
}
function CreateDailyBank() {
    var newMessage = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"date\">DetailedBank</label>\n" +
        "                    <input type=\"date\" id=\"date\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <input type=\"submit\" id='btnDailyUserSummary' value=\"Find Report\" onclick=\"sendDailyBank()\">\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = newMessage;
    document.getElementById('btnDailyUserSummary').addEventListener('click', function (event) {
        event.preventDefault();
    });
}
async function sendDailyBank() {
    const obj = await detailedBank();
    if (obj.success == true) {
        if (obj.count > 0) {
            rep = "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            rep += "<td align='left'>Page 1 of 1";
            rep += "<td align='left'></td>";
            rep += "<td align='right'><h5><a onclick='Previous()' class='my-link'>Bank Detailed Report : " + document.getElementById('date').value + "</h5></td>";
            rep += "<td align='right'><h5><a onclick='Next()' class='my-link'></h5></td>";
            rep += "</tr>";
            rep += "</table>";
            rep += "<table class='table-filled' border='2' width=\"100%\">";
            rep += "<tr>";
            rep += "<th>Username</th>";
            rep += "<th>Transaction</th>";
            rep += "<th>Code</th>";
            rep += "<th>Amount</th>";
            rep += "<th>Balance</th>";
            rep += "<th>Time</th>";
            rep += "</tr>";
            var c;
            var len = obj.data.length;
            for (c = 0; c < len; c++) {
                rep += "<tr>";
                rep += "<td>" + obj.data[c].username + "</td>";
                rep += "<td>" + obj.data[c].transactionType + "</td>";
                rep += "<td>" + obj.data[c].transactionCode + "</td>";
                rep += "<td>" + obj.data[c].amount + "</td>";
                rep += "<td>" + obj.data[c].balance + "</td>";
                rep += "<td>" + obj.data[c].bTime + "</td>";
                rep += "</tr>";
            }
            rep = rep + "</table>";
            rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            rep += "<td align='left'>Page 1 of 1";
            rep += "<td align='left'></td>";
            rep += "<td align='right'><h5><a onclick='Previous()' class='my-link'></a></h5></td>";
            rep += "<td align='right'><h5><a onclick='Next()' class='my-link'></a></h5></td>";
            rep += "</tr>";
            rep += "</table>";
            document.getElementById("main-container").innerHTML = rep;
        } else {
            rep = "<p class=no-record-response>No record found</p>";
            document.getElementById("main-container").innerHTML = rep;
        }
    }
}
async function detailedBank() {
    const url = sessionStorage.getItem("host") + "/api/v1/bank/daily?storecode=" +
        sessionStorage.getItem('storecode') + "&username=" +
        sessionStorage.getItem('username') + "&saleDate=" + document.getElementById('date').value;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error:", error.message);
    }
}
function createDailyBankSummary() {
    var newMessage = "<div class=\"form-layout\">\n" +
        "            <form class=\"login-form\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"date\">BankSummary</label>\n" +
        "                    <input type=\"date\" id=\"date\" aria-describedby=\"info\">\n" +
        "                </div>\n" +
        "                <input type=\"submit\" id='btnDailyUserSummary' value=\"Find Report\" onclick=\"sendBankSummary()\">\n" +
        "            </form>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = newMessage;
    document.getElementById('btnDailyUserSummary').addEventListener('click', function (event) {
        event.preventDefault();
    });
}
async function sendBankSummary() {
    const obj = await BankSummary();
    if (obj.success == true) {
        if (obj.count > 0) {
            rep = "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            //pages = Math.ceil(obj.count / payload);
            rep += "<td align='left'>Page 1 of 1";
            rep += "<td align='left'></td>";
            rep += "<td align='right'><h5><a onclick='Previous()' class='my-link'>Bank Summary Report : " + document.getElementById('date').value + "</h5></td>";
            rep += "<td align='right'><h5><a onclick='Next()' class='my-link'></h5></td>";
            rep += "</tr>";
            rep += "</table>";
            rep += "<table class='table-filled' border='2' width=\"100%\">";
            rep += "<tr>";
            rep += "<th>Username</th>";
            rep += "<th>Code</th>";
            rep += "<th>Amount</th>";
            rep += "</tr>";
            var c;
            var total;
            total = 0;
            var len = obj.data.length;
            for (c = 0; c < len; c++) {
                rep += "<tr>";
                rep += "<td>" + obj.data[c].username + "</td>";
                rep += "<td>" + obj.data[c].code + "</td>";
                rep += "<td>" + obj.data[c].amount + "</td>";
                total = total + obj.data[c].amount;
                rep += "</tr>";
            }
            rep += "<tr>";
            rep += "<th></th>";
            rep += "<th></th>";
            rep += "<th>R: " + new Intl.NumberFormat('en-IN').format(total) + "</th>";
            rep += "</tr>";
            rep = rep + "</table>";
            rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            rep += "<td align='left'>Page 1 of 1";
            rep += "<td align='left'></td>";
            rep += "<td align='right'><h5><a onclick='Previous()' class='my-link'></h5></td>";
            rep += "<td align='right'><h5><a onclick='Next()' class='my-link'></h5></td>";
            rep += "</tr>";
            rep += "</table>";
            document.getElementById("main-container").innerHTML = rep;
        } else {
            rep = "<p class=no-record-response>No record found</p>";
            document.getElementById("main-container").innerHTML = rep;
        }
    }
}
async function BankSummary() {
    const url = sessionStorage.getItem("host") + "/api/v1/bank/grouping?storecode=" +
        sessionStorage.getItem('storecode') + "&username=" +
        sessionStorage.getItem('username') + "&saleDate=" + document.getElementById('date').value;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error:", error.message);
    }
}
function dateChange() {
    const date = document.getElementById('dateDailyGrouping').value;
    //alert(document.getElementById('dateDailyGrouping').value);
    SendDailyGrouping(date);
}
function createIncome() {
    var text = "<div class=\"form-layout\">\n" +
        "                <div class=\"igroup\">\n" +
        "                    <label for=\"txtyear\">Year</label>\n" +
        "                    <br/>\n" +
        "                    <input type=\"text\" id='txtyear' aria-describedby=\"info\">\n" +
        "                    <input type=\"submit\" id=\"btnSearch\" value=\"Search\" onclick=\"sendAnnualIncome()\">\n" +
        "                </div>\n" +
        "        </div>";
    document.getElementById("main-container").innerHTML = text;
    document.getElementById('btnSearch').addEventListener('click', function (event) {
        event.preventDefault();
    });
}
async function sendAnnualIncome() {
    document.getElementById('btnSearch').value = "Processing....";
    const obj = await annualIncome();
    //console.log(obj)
    if (obj.success == true) {
        if (obj.count > 0) {
            rep = "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            rep += "<td align='left'>Page 1 of 1";
            rep += "<td align='left'></td>";
            rep += "<td align='right'><h5><a onclick='Previous()' class='my-link'>Annual Income Report for : " + document.getElementById('txtyear').value + "</h5></td>";
            rep += "<td align='right'><h5><a onclick='Next()' class='my-link'></h5></td>";
            rep += "</tr>";
            rep += "</table>";
            rep += "<table class='table-filled' border='2' width=\"100%\">";
            rep += "<tr>";
            rep += "<th>Month</th>";
            rep += "<th>Income</th>";
            rep += "<th>Expense</th>";
            rep += "<th>Profit/Loss</th>";
            rep += "</tr>";
            var c;
            var total;
            total = 0;
            var len = obj.data.length;
            for (c = 0; c < len; c++) {
                total = total + obj.data[c].profit;
                rep += "<tr>";
                rep += "<td>" + obj.data[c].month + "</td>";
                rep += "<td>" + obj.data[c].income + "</td>";
                rep += "<td>" + obj.data[c].expnse + "</td>";
                rep += "<td>" + obj.data[c].profit + "</td>";

                rep += "</tr>";
            }
            rep += "<tr>";
            rep += "<th></th>";
            rep += "<th></th>";
            rep += "<th></th>";
            rep += "<th>R: " + new Intl.NumberFormat('en-IN').format(total) + "</th>";
            rep += "</tr>";
            rep = rep + "</table>";
            rep += "<table class='my-paging' border='0' width='100%' cellpadding='10'>";
            rep += "<tr>";
            rep += "<td align='left'>Page 1 of 1";
            rep += "<td align='left'></td>";
            rep += "</tr>";
            rep += "</table>";
            document.getElementById("main-container").innerHTML = rep;
        } else {
            rep = "<p class=no-record-response>No record found</p>";
            document.getElementById("main-container").innerHTML = rep;
        }
    }
}
async function annualIncome() {
    const url = sessionStorage.getItem("host") + "/api/v1/income/annual?storecode=" +
        sessionStorage.getItem('storecode') + "&username=" +
        sessionStorage.getItem('username') + "&year=" + document.getElementById('txtyear').value;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error:", error.message);
    }
}



function toggleSidebar() {
    const sidebar = document.querySelector('.main-side');
    const mainContainer = document.querySelector('.main-container');
    sidebar.classList.toggle('open');

    if (sidebar.classList.contains('open')) {
        mainContainer.style.marginLeft = '260px';
    } else {
        mainContainer.style.marginLeft = '0';
    }
}