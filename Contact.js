export function Contact (phone,lastname,firstname,email,profile,gravatar,id) {
        this.phone = phone,
        this.lastname = lastname,
        this.firstname = firstname,
        this.email = email,
        this.profile = profile,
        this.gravatar = gravatar,
        this.id = id
  };

export let newcontact = new Contact('0641382323','Coxam','Clement','clement.coxam@gmail.com','Famille','gravatar','1');

