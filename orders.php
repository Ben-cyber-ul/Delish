<?php
header("Content-Type: application/json");

require "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode([
    "success" => false,
    "message" => "Invalid request method"
  ]);
  exit;
}

// Get POST data safely
$fullname = trim($_POST["fullname"] ?? "");
$email    = trim($_POST["email"] ?? "");
$product  = trim($_POST["product"] ?? "");
$quantity = intval($_POST["quantity"] ?? 0);

// Validation
if ($fullname === "" || $email === "" || $product === "" || $quantity < 1) {
  http_response_code(400);
  echo json_encode([
    "success" => false,
    "message" => "Invalid order data"
  ]);
  exit;
}

// Insert into database
$stmt = $conn->prepare(
  "INSERT INTO orders (fullname, email, product, quantity)
   VALUES (?, ?, ?, ?)"
);

$stmt->bind_param("sssi", $fullname, $email, $product, $quantity);

if ($stmt->execute()) {
  echo json_encode([
    "success" => true,
    "message" => "Order placed successfully"
  ]);
} else {
  http_response_code(500);
  echo json_encode([
    "success" => false,
    "message" => "Failed to place order"
  ]);
}

$stmt->close();
$conn->close();