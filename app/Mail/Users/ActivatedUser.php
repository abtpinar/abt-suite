<?php

namespace App\Mail\Users;

use App\Data\Entities\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ActivatedUser extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * User to send activated email.
     *
     * @var User
     */
    private $user;

    /**
     * @var string
     */
    private $url;

    /**
     * Create a new message instance.
     *
     * @param User $user
     * @param string $url Url to redirect.
     */
    public function __construct(User $user, $url)
    {
        $this->user = $user;
        $this->url = $url;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('mails.users.activated')
            ->subject('Usuario Creado')
            ->with(
                [
                    'user' => $this->user,
                    'url' => $this->url . '/' . $this->user->password_change_key
                ]
            );
    }
}
