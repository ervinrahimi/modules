import { NextResponse } from 'next/server';
import sdb from '@/db/surealdb';

/**
 * API Endpoint for managing specific records in the "example" table in SurrealDB.
 * 
 * - `PUT`: Update a specific record by ID.
 * - `DELETE`: Delete a specific record by ID.
 */

// Update a specific record
export async function PUT(request, { params }) {
  try {
    const db = await sdb();
    const { id } = params;

    // Validate ID
    if (!id) {
      return NextResponse.json(
        {
          error: {
            code: 'missing_id',
            message: 'The record ID is required.',
          },
        },
        { status: 400 }
      );
    }

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

    // Update the record in the "example" table
    const result = await db.query('UPDATE example SET content = $data WHERE id = $id;', {
      id,
      data: body,
    });

    const updatedRecord = result[0]?.result;

    if (!updatedRecord) {
      return NextResponse.json(
        {
          error: {
            code: 'record_not_found',
            message: `No record found with ID: ${id}.`,
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Record updated successfully.',
        data: updatedRecord,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating record:', error);

    return NextResponse.json(
      {
        error: {
          code: 'update_record_error',
          message: 'An error occurred while updating the record.',
          details: error.message,
        },
      },
      { status: 500 }
    );
  }
}

// Delete a specific record
export async function DELETE(request, { params }) {
  try {
    const db = await sdb();
    const { id } = params;

    // Validate ID
    if (!id) {
      return NextResponse.json(
        {
          error: {
            code: 'missing_id',
            message: 'The record ID is required.',
          },
        },
        { status: 400 }
      );
    }

    // Delete the record from the "example" table
    const result = await db.query('DELETE FROM example WHERE id = $id;', { id });

    if (result[0]?.result === 0) {
      return NextResponse.json(
        {
          error: {
            code: 'record_not_found',
            message: `No record found with ID: ${id}.`,
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Record deleted successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting record:', error);

    return NextResponse.json(
      {
        error: {
          code: 'delete_record_error',
          message: 'An error occurred while deleting the record.',
          details: error.message,
        },
      },
      { status: 500 }
    );
  }
}
