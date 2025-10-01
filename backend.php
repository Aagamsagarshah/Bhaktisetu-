<?php
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "temple";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Upload photo
$target_dir = "uploads/";
if (!is_dir($target_dir)) {
    mkdir($target_dir, 0777, true);
}
$target_file = $target_dir . basename($_FILES["aadhar_photo"]["name"]);
move_uploaded_file($_FILES["aadhar_photo"]["tmp_name"], $target_file);

// Prepare data
$temple_name    = $_POST['temple_name'];  // NEW
$first_name     = $_POST['first_name'];
$last_name      = $_POST['last_name'];
$contact_number = $_POST['contact_number'];
$state          = $_POST['state'];
$city           = $_POST['city'];
$date_of_visit  = $_POST['date_of_visit'];
$time_slot      = $_POST['time_slot'];
$total_members  = $_POST['total_members'];
$full_name      = $_POST['full_name'];
$gender         = $_POST['gender'];
$id_proof_type  = $_POST['id_proof_type'];
$aadhar_number  = $_POST['aadhar_number'];

// Insert into DB
$sql = "INSERT INTO temple_visits
(temple_name, first_name, last_name, contact_number, state, city, date_of_visit, time_slot, total_members, full_name, gender, id_proof_type, aadhar_number, aadhar_photo) 
VALUES 
('$temple_name', '$first_name', '$last_name', '$contact_number', '$state', '$city', '$date_of_visit', '$time_slot', '$total_members', '$full_name', '$gender', '$id_proof_type', '$aadhar_number', '$target_file')";

if ($conn->query($sql) === TRUE) {
    // Redirect based on temple
    if ($temple_name == "Somnath") {
        header("Location: somnathpayment.html");
    } elseif ($temple_name == "Dwarka") {
        header("Location: dwarkapayment.html");
    } else {
        echo "Booking saved, but no payment page found.";
    }
    exit;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>