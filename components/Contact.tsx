"use client"; // Mark this component as a Client Component

import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import emailjs from "@emailjs/browser";
import { gsap } from "gsap";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Meteors } from "./ui/Meteors"; // Import Meteors component

// Custom IcosahedronGeometry class
class CustomIcosahedronGeometry extends THREE.PolyhedronGeometry {
  constructor(radius = 1, detail = 0) {
    const t = (1 + Math.sqrt(5)) / 2;

    const vertices = [
      -1, t, 0, 1, t, 0, -1, -t, 0, 1, -t, 0,
      0, -1, t, 0, 1, t, 0, -1, -t, 0, 1, -t,
      t, 0, -1, t, 0, 1, -t, 0, -1, -t, 0, 1,
    ];

    const indices = [
      0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11,
      1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8,
      3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9,
      4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1,
    ];

    super(vertices, indices, radius, detail);

    this.type = "CustomIcosahedronGeometry";

    this.parameters = {
      radius: radius,
      detail: detail,
    };
  }

  static fromJSON(data) {
    return new CustomIcosahedronGeometry(data.radius, data.detail);
  }
}

// 3D Scene Component
const Scene = () => {
  const meshRef = useRef<THREE.Mesh>(null!); // Initialize meshRef correctly
  const { camera, gl } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;

    let mouseDown = false;
    let rgb = [12, 23, 55];

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseDown && meshRef.current) {
        rgb = [
          Math.round((e.pageX / window.innerWidth) * 255),
          Math.round((e.pageY / window.innerHeight) * 255),
          150,
        ];
        const newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
        gsap.to(meshRef.current.material.color, {
          r: newColor.r,
          g: newColor.g,
          b: newColor.b,
        });
      }
    };

    const handleMouseDown = () => (mouseDown = true);
    const handleMouseUp = () => (mouseDown = false);

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    // Animation timeline for mesh scale
    gsap.fromTo(
      meshRef.current.scale,
      { z: 0, x: 0, y: 0 },
      { z: 1, x: 1, y: 1, duration: 1 }
    );

    return () => {
      controls.dispose();
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [camera, gl]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01; // Rotate mesh every frame
    }
  });

  return (
    <mesh ref={meshRef} geometry={new CustomIcosahedronGeometry(3, 0)}>
      <meshStandardMaterial color={"#888888"} roughness={0.8} />
    </mesh>
  );
};

// Main Contact Component
const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        'service_m9k0sp8',
        'template_csrrs9e',
        {
          from_name: form.name,
          to_name: "Tsang HL",
          from_email: form.email,
          to_email: "tsanghl1213@gmail.com",
          message: form.message,
        },
        '9NNI83_W-aKu-hlTz'
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div id="contact" className="py-20 w-full flex flex-col items-center mt-60 relative">
      <h1 className="heading">
        <span className="text-white">Contact</span>
      </h1>

      <div className="relative max-w-md w-full mt-12">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] blur-3xl rounded-full"></div>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative shadow-xl bg-gray-900 border border-gray-800 p-8 overflow-hidden rounded-2xl flex flex-col items-center z-10"
        >
          <h2 className="text-2xl font-bold text-center text-white mb-8">
            Contact Me
          </h2>
          <label className="block mb-4 w-full">
            <span className="text-white">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="w-full px-4 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg text-white"
              required
            />
          </label>
          <label className="block mb-4 w-full">
            <span className="text-white">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="w-full px-4 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg text-white"
              required
            />
          </label>
          <label className="block mb-4 w-full">
            <span className="text-white">Your Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message"
              className="w-full px-4 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg text-white"
              rows={4}
              required
            ></textarea>
          </label>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg"
          >
            {loading ? "Sending..." : "Send"}
          </button>

          {/* Meteors effect inside the contact box */}
          <Meteors number={10} /> {/* Adjust the number of meteors as needed */}
        </form>
      </div>

      <div className="mt-8 w-full max-w-md">
        <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
          <ambientLight intensity={0.5} />
          <directionalLight position={[8, 5, 5]} intensity={1} />
          <pointLight position={[0, 0, 10]} intensity={2} />
        </Canvas>
      </div>
    </div>
  );
};

export default Contact;
