<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TimeEntry;

class TimeEntrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TimeEntry::create(['name' =>'Independência do Brasil', 'entry_date'=> '1822-09-07', 'annual_importance'=>true, 'monthly_importance'=>false, 'timeline_id'=> '1']);
        TimeEntry::create(['name' => 'Abolição do trabalho escravo', 'entry_date'=> '1888-05-13', 'annual_importance'=>true, 'monthly_importance'=> false, 'timeline_id'=> '1']);
        TimeEntry::create(['name' => 'Inicio da Primeira Guerra Mundial', 'entry_date' => '1914-07-28', 'annual_importance'=> true, 'monthly_importance'=>false, 'timeline_id'=> '2']);
        TimeEntry::create(['name' => 'Término da Primeira Guerra Mundial', 'entry_date' => '1918-11-11', 'annual_importance'=> true, 'monthly_importance'=>false, 'timeline_id'=>'2']);
        TimeEntry::create(['name' => 'Inicio da Segunda Guerra Mundial', 'entry_date'=>'1939-09-01', 'annual_importance'=> true, 'monthly_importance'=>false, 'timeline_id'=>'2']);
        TimeEntry::create(['name' => 'Término da Segunda Guerra Mundial', 'entry_date'=>'1945-09-02', 'annual_importance'=> true, 'monthly_importance'=>false, 'timeline_id'=>'2']);

    }
}