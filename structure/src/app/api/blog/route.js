import { NextResponse } from 'next/server';
import sdb from '@/db/surealdb';

/**
 * API Endpoint for managing the "example" table in SurrealDB.
 * 
 * - `GET`: Fetch all records.
 * - `POST`: Create a new record.
 */

// Fetch all records
export async function GET() {
  try {
    const db = await sdb();

    // Query all records from the "example" table
    const result = await db.query('SELECT * FROM example;');
    const data = result[0]?.result || [];

    return NextResponse.json(
      { message: 'Records fetched successfully.', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching records:', error);

    return NextResponse.json(
      {
        error: {
          code: 'fetch_records_error',
          message: 'An error occurred while fetching records from the database.',
          details: error.message,
        },
      },
      { status: 500 }
    );
  }
}

// Create a new record
export async function POST(request) {
  try {
    const db = await sdb();

    // Parse the request body
    const body = await request.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        {
          error: {
            code: 'invalid_input',
            message: 'The request body must be a valid JSON object.',
          },
        },
        { status: 400 }
      );
    }

    // Insert the new record into the "example" table
    const result = await db.query('INSERT INTO example CONTENT $data;', { data: body });
    const createdRecord = result[0]?.result;

    return NextResponse.json(
      {
        message: 'Record created successfully.',
        data: createdRecord,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating record:', error);

    return NextResponse.json(
      {
        error: {
          code: 'create_record_error',
          message: 'An error occurred while creating the record.',
          details: error.message,
        },
      },
      { status: 500 }
    );
  }
}
