<?
namespace App\GraphQL\Mutations;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
class Login
{
    public function __invoke($_, array $args): User
    {
        if (Auth::attempt($args)) {
            $user = User::find(Auth::id());
            return $user;
        }
        return null;
        // ‘message’ => ‘The username/password combination you entered is invalid.’,
    }
}