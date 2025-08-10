# QMS Finishing Module - Mobile App (Android)

**Short Description:**  
Android mobile app for performing **fabric roll inspections** in the finishing stage, allowing workers to record inspection results, add roll details, and print final inspection stickers.

---

## Overview
This repository contains the **Android mobile application** for the **QMS (Quality Management System) Finishing Module**.  
It is used by production floor workers to perform **fabric roll inspections** and record inspection results directly from the shop floor.

---

## Features
1. Retrieve batch and roll data from the **SQ Planning Software**.
2. Manually add extra rolls if required.
3. Record **roll weight**.
4. Add **GSM** (Grams per Square Meter) values.
5. Perform **4-Point Fabric Inspection** for quality evaluation.
6. Print a **final inspection sticker** for each roll based on the inspection result.

---

## Workflow
```mermaid
flowchart TD
    A[Fetch Batch & Roll Data from SQ Planning Software] --> B[Optional: Add Extra Rolls]
    B --> C[Add Roll Weight & GSM]
    C --> D[Perform 4-Point Fabric Inspection]
    D --> E[Determine Pass/Fail Result]
    E --> F[Print Final Inspection Sticker]

