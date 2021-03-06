<?php

namespace App\GraphQL\Mutations;
use App\Models\Book;
use App\Models\TimeEntry;

class DeleteBook
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $book = Book::find($args)[0];
        // $time_entries = $book->time_entries()->get();
        $time_entries = TimeEntry::where('book_id', $args)->get();
        foreach ($time_entries as $time_entry) {
            $time_entry->book_id = null;
            $time_entry->save();
        }
        if (sizeof($time_entries) === 0) {

            $book->delete();

            return ['message' => 'Livro deletado com sucesso', 'success'=> true];
        } else {
            return ['message' => 'Falha ao deletar livro', 'success'=> false];
        }
    }
}
