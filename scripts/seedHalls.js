import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hall from '../models/Hall.js';

dotenv.config();

const halls = [
  {
    name: "A-Block Conf. Hall (1st Floor)",
    location: "A Block, 1st Floor",
    capacity: 100,
    amenities: ["Projector", "Air Conditioning", "Wi-Fi"]
  },
  {
    name: "B-Block OAT (G Floor)",
    location: "B Block, Ground Floor",
    capacity: 200,
    amenities: ["Open Air", "Stage", "Sound System"]
  },
  {
    name: "B-Block Auditorium (G Floor)",
    location: "B Block, Ground Floor",
    capacity: 300,
    amenities: ["Projector", "Air Conditioning", "Sound System", "Stage"]
  },
  {
    name: "C Block Fintan Hall (G Floor)",
    location: "C Block, Ground Floor",
    capacity: 150,
    amenities: ["Projector", "Air Conditioning", "Wi-Fi"]
  },
  {
    name: "C Block Conference Hall",
    location: "C Block",
    capacity: 80,
    amenities: ["Projector", "Air Conditioning", "Wi-Fi", "Video Conferencing"]
  },
  {
    name: "Delany Hall",
    location: "Main Building",
    capacity: 250,
    amenities: ["Projector", "Air Conditioning", "Sound System", "Stage"]
  },
  {
    name: "BMS Hall",
    location: "BMS Building",
    capacity: 120,
    amenities: ["Projector", "Air Conditioning", "Wi-Fi"]
  },
  {
    name: "Student Cafeteria",
    location: "Campus Center",
    capacity: 200,
    amenities: ["Catering Services", "Wi-Fi"]
  },
  {
    name: "Library Reference Hall",
    location: "Library Building",
    capacity: 50,
    amenities: ["Wi-Fi", "Reference Materials"]
  },
  {
    name: "Board Room",
    location: "Administrative Block",
    capacity: 20,
    amenities: ["Video Conferencing", "Whiteboard", "Wi-Fi"]
  },
  {
    name: "Computer Lab",
    location: "IT Block",
    capacity: 60,
    amenities: ["Computers", "Projector", "Air Conditioning", "Wi-Fi"]
  }
];

async function seedHalls() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Hall.deleteMany({}); // Clear existing halls
    await Hall.insertMany(halls);

    console.log('Halls seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding halls:', error);
    process.exit(1);
  }
}

seedHalls();

